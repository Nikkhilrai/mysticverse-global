/*
  Admin notifications — what needs attention right now.

  Every submission model already carries `status: NEW` until someone
  marks it Read or Archived, so that flag is the unread signal; there's
  no separate read-tracking table to keep in sync. A submission stays in
  the bell until it's actioned, which is the behaviour you want for a
  sales inbox — closing the panel shouldn't make a lead disappear.

  Everything here respects the caller's permissions: an EDITOR only ever
  sees counts for sections they can open.
*/

import { prisma } from "@/lib/db";
import { can, type AccessSubject, type ResourceKey } from "@/lib/permissions";

export interface AdminNotification {
  id: string;
  resource: ResourceKey;
  /** Section label, e.g. "Pass registrations". */
  section: string;
  href: string;
  title: string;
  detail: string;
  createdAt: string; // ISO — serialisable across the RSC boundary
}

export interface AdminNotifications {
  total: number;
  counts: Partial<Record<ResourceKey, number>>;
  recent: AdminNotification[];
}

const RECENT_PER_SOURCE = 5;
const RECENT_SHOWN = 12;

function money(minor: number, currency: string): string {
  return `${currency} ${(minor / 100).toLocaleString("en-US")}`;
}

export async function getAdminNotifications(
  subject: AccessSubject,
): Promise<AdminNotifications> {
  const allow = (r: ResourceKey) => can(subject, r);

  const NEW = { status: "NEW" as const };
  const recentArgs = {
    where: NEW,
    orderBy: { createdAt: "desc" as const },
    take: RECENT_PER_SOURCE,
  };

  const [
    passesCount, passesRecent,
    interestCount, interestRecent,
    contactCount, contactRecent,
    awardNomCount, awardNomRecent,
    nominationsCount, nominationsRecent,
    decksCount, decksRecent,
    briefCount, briefRecent,
  ] = await Promise.all([
    allow("passes") ? prisma.passRegistration.count({ where: NEW }) : 0,
    allow("passes") ? prisma.passRegistration.findMany(recentArgs) : [],

    allow("interest") ? prisma.interestSubmission.count({ where: NEW }) : 0,
    allow("interest") ? prisma.interestSubmission.findMany(recentArgs) : [],

    allow("contact") ? prisma.contactSubmission.count({ where: NEW }) : 0,
    allow("contact") ? prisma.contactSubmission.findMany(recentArgs) : [],

    allow("award-nominations") ? prisma.awardNomination.count({ where: NEW }) : 0,
    allow("award-nominations") ? prisma.awardNomination.findMany(recentArgs) : [],

    allow("nominations") ? prisma.awardSubmission.count({ where: NEW }) : 0,
    allow("nominations") ? prisma.awardSubmission.findMany(recentArgs) : [],

    allow("decks") ? prisma.deckRequest.count({ where: NEW }) : 0,
    allow("decks") ? prisma.deckRequest.findMany(recentArgs) : [],

    allow("pavilion-brief") ? prisma.pavilionBriefRequest.count({ where: NEW }) : 0,
    allow("pavilion-brief") ? prisma.pavilionBriefRequest.findMany(recentArgs) : [],
  ]);

  const recent: AdminNotification[] = [
    ...passesRecent.map((r) => ({
      id: r.id,
      resource: "passes" as ResourceKey,
      section: r.paymentStatus === "PAID" ? "Pass sold" : "Pass registration",
      href: "/admin/passes",
      title: r.seats > 1 ? `${r.name} — ${r.seats} seats` : r.name,
      detail:
        r.paymentStatus === "PAID"
          ? `${money(r.amount, r.currency)} paid · ${r.passType}`
          : `${r.passType} · payment ${r.paymentStatus.toLowerCase()}`,
      createdAt: r.createdAt.toISOString(),
    })),
    ...interestRecent.map((r) => ({
      id: r.id,
      resource: "interest" as ResourceKey,
      section: r.seats ? "Corporate enquiry" : "Delegate interest",
      href: "/admin/interest",
      title: r.name,
      detail: [r.company, r.seats ? `${r.seats} seats` : r.passType]
        .filter(Boolean)
        .join(" · ") || r.email,
      createdAt: r.createdAt.toISOString(),
    })),
    ...contactRecent.map((r) => ({
      id: r.id,
      resource: "contact" as ResourceKey,
      section: "Contact enquiry",
      href: "/admin/contact",
      title: r.name,
      detail: [r.organisation, r.enquiryType].filter(Boolean).join(" · ") || r.email,
      createdAt: r.createdAt.toISOString(),
    })),
    ...awardNomRecent.map((r) => ({
      id: r.id,
      resource: "award-nominations" as ResourceKey,
      section: "Award application",
      href: "/admin/award-nominations",
      title: r.nomineeName?.trim() || r.nominatorName,
      detail: `${r.categories.length} categor${r.categories.length === 1 ? "y" : "ies"} · ${money(r.amount, r.currency)} · ${r.paymentStatus.toLowerCase()}`,
      createdAt: r.createdAt.toISOString(),
    })),
    ...nominationsRecent.map((r) => ({
      id: r.id,
      resource: "nominations" as ResourceKey,
      section: r.kind === "JURY_PARTNER" ? "Jury enquiry" : "Awards nomination",
      href: "/admin/nominations",
      title: r.nomineeName?.trim() || r.name,
      detail: r.category ?? r.email,
      createdAt: r.createdAt.toISOString(),
    })),
    ...decksRecent.map((r) => ({
      id: r.id,
      resource: "decks" as ResourceKey,
      section: "Deck request",
      href: "/admin/decks",
      title: r.name,
      detail: [r.organisation, r.deckName].filter(Boolean).join(" · ") || r.email,
      createdAt: r.createdAt.toISOString(),
    })),
    ...briefRecent.map((r) => ({
      id: r.id,
      resource: "pavilion-brief" as ResourceKey,
      section: "Pavilion brief",
      href: "/admin/pavilion-brief",
      title: r.name,
      detail: [r.company, r.tierInterest].filter(Boolean).join(" · ") || r.email,
      createdAt: r.createdAt.toISOString(),
    })),
  ]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, RECENT_SHOWN);

  const counts: Partial<Record<ResourceKey, number>> = {};
  const set = (k: ResourceKey, v: number) => {
    if (v > 0) counts[k] = v;
  };
  set("passes", passesCount);
  set("interest", interestCount);
  set("contact", contactCount);
  set("award-nominations", awardNomCount);
  set("nominations", nominationsCount);
  set("decks", decksCount);
  set("pavilion-brief", briefCount);

  const total =
    passesCount + interestCount + contactCount + awardNomCount +
    nominationsCount + decksCount + briefCount;

  return { total, counts, recent };
}
