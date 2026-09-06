"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setPassStatus(id: string, status: Status) {
  await assertPermission("passes");
  await prisma.passRegistration.update({ where: { id }, data: { status } });
  revalidatePath("/admin/passes");
  revalidatePath("/admin");
}

export async function deletePass(id: string) {
  await assertPermission("passes");
  await prisma.passRegistration.delete({ where: { id } });
  revalidatePath("/admin/passes");
  revalidatePath("/admin");
}
