import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CorporateOrderSchema } from "@/lib/validation";
import { getPassById } from "@/lib/passes";
import {
  corporateAmountMinor,
  getTierForSeats,
  MIN_BUNDLE_SEATS,
  formatAed,
} from "@/lib/corporate";
import { createOrder, razorpayConfigured, razorpayKeyId } from "@/lib/razorpay";
import { notifyAfter, rowsToHtml } from "@/lib/email";

export const runtime = "nodejs";

/*
  Corporate team booking — N seats in one transaction.

  Pricing authority is the seat count: the tier discount is looked up
  server-side from CORPORATE_TIERS and multiplied by the Seeker Pass
  price. The client never sends an amount, and the 5-seat minimum is
  enforced here rather than relying on a coupon code (which couldn't
  express a quantity rule).

  Payment verification is shared with the individual pass flow via
  /api/passes/verify — a corporate booking is a PassRegistration with
  seats > 1.
*/
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently accept bots without creating a booking.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true, bot: true });
  }

  const parsed = CorporateOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 422 },
    );
  }
  const d = parsed.data;

  const amount = corporateAmountMinor(d.seats);
  const tier = getTierForSeats(d.seats);
  if (amount === null || !tier) {
    return NextResponse.json(
      {
        ok: false,
        error: `Team bookings start at ${MIN_BUNDLE_SEATS} seats. For fewer, please book individually on the register page.`,
      },
      { status: 422 },
    );
  }

  const pass = getPassById("seeker")!;
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // Persist as PENDING before touching Razorpay — the booking is never lost.
  let booking;
  try {
    booking = await prisma.passRegistration.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone ?? null,
        company: d.company,
        passType: `${pass.name} · Team (${d.seats} seats)`,
        seats: d.seats,
        amount,
        currency: pass.currency,
        utmSource: d.utmSource ?? null,
        utmMedium: d.utmMedium ?? null,
        utmCampaign: d.utmCampaign ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch (err) {
    console.error("[corporate/order] db write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  notifyAfter(
    `New team booking — ${d.seats} seats · ${d.company}`,
    rowsToHtml("New Corporate Team Booking (pending payment)", [
      ["Company", d.company],
      ["Seats", String(d.seats)],
      ["Rate", `${tier.discountPct}% off`],
      ["Total", formatAed(amount / 100)],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Notes", d.message],
      ["Payment", "Pending"],
    ]),
  );

  if (!razorpayConfigured) {
    return NextResponse.json({
      ok: true,
      paymentReady: false,
      registrationId: booking.id,
    });
  }

  try {
    const order = await createOrder({
      amount,
      currency: pass.currency,
      receipt: booking.id,
      notes: {
        type: "corporate",
        seats: String(d.seats),
        company: d.company,
        email: d.email,
      },
    });

    await prisma.passRegistration.update({
      where: { id: booking.id },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      ok: true,
      paymentReady: true,
      registrationId: booking.id,
      keyId: razorpayKeyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      seats: d.seats,
      prefill: { name: d.name, email: d.email, contact: d.phone ?? "" },
    });
  } catch (err) {
    console.error("[corporate/order] razorpay order failed:", err);
    return NextResponse.json(
      {
        ok: false,
        leadCaptured: true,
        registrationId: booking.id,
        error:
          "We saved your booking, but couldn't start payment just now. Our team will reach out to complete it.",
      },
      { status: 502 },
    );
  }
}
