"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function changePassword(
  current: string,
  next: string,
): Promise<{ ok?: true; error?: string }> {
  const session = await getSession();
  if (!session) return { error: "Unauthorized." };
  if (!next || next.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  const user = await prisma.user.findUnique({ where: { id: session.uid as string } });
  if (!user) return { error: "Account not found." };
  const ok = await verifyPassword(current, user.passwordHash);
  if (!ok) return { error: "Current password is incorrect." };
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(next) },
  });
  return { ok: true };
}
