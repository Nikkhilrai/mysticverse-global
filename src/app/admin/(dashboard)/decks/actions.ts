"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setDeckStatus(id: string, status: Status) {
  await assertPermission("decks");
  await prisma.deckRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/decks");
  revalidatePath("/admin");
}

export async function deleteDeckRequest(id: string) {
  await assertPermission("decks");
  await prisma.deckRequest.delete({ where: { id } });
  revalidatePath("/admin/decks");
  revalidatePath("/admin");
}
