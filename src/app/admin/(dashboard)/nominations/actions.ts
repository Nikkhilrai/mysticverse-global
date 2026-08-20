"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setAwardStatus(id: string, status: Status) {
  await assertPermission("nominations");
  await prisma.awardSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/nominations");
  revalidatePath("/admin");
}

export async function deleteAward(id: string) {
  await assertPermission("nominations");
  await prisma.awardSubmission.delete({ where: { id } });
  revalidatePath("/admin/nominations");
  revalidatePath("/admin");
}
