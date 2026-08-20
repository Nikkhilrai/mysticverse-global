"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setInterestStatus(id: string, status: Status) {
  await assertPermission("interest");
  await prisma.interestSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/interest");
  revalidatePath("/admin");
}

export async function deleteInterest(id: string) {
  await assertPermission("interest");
  await prisma.interestSubmission.delete({ where: { id } });
  revalidatePath("/admin/interest");
  revalidatePath("/admin");
}
