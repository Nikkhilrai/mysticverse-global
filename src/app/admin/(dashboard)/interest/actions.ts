"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setInterestStatus(id: string, status: Status) {
  if (!(await getSession())) throw new Error("Unauthorized");
  await prisma.interestSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/interest");
  revalidatePath("/admin");
}

export async function deleteInterest(id: string) {
  if (!(await getSession())) throw new Error("Unauthorized");
  await prisma.interestSubmission.delete({ where: { id } });
  revalidatePath("/admin/interest");
  revalidatePath("/admin");
}
