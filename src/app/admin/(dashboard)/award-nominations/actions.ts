"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setAwardNominationStatus(id: string, status: Status) {
  await assertPermission("award-nominations");
  await prisma.awardNomination.update({ where: { id }, data: { status } });
  revalidatePath("/admin/award-nominations");
  revalidatePath("/admin");
}

export async function deleteAwardNomination(id: string) {
  await assertPermission("award-nominations");
  await prisma.awardNomination.delete({ where: { id } });
  revalidatePath("/admin/award-nominations");
  revalidatePath("/admin");
}
