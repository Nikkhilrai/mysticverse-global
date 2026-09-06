"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setPavilionBriefStatus(id: string, status: Status) {
  await assertPermission("pavilion-brief");
  await prisma.pavilionBriefRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/pavilion-brief");
  revalidatePath("/admin");
}

export async function deletePavilionBrief(id: string) {
  await assertPermission("pavilion-brief");
  await prisma.pavilionBriefRequest.delete({ where: { id } });
  revalidatePath("/admin/pavilion-brief");
  revalidatePath("/admin");
}
