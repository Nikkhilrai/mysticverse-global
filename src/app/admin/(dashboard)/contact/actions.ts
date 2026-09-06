"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

type Status = "NEW" | "READ" | "ARCHIVED";

export async function setContactStatus(id: string, status: Status) {
  await assertPermission("contact");
  await prisma.contactSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
}

export async function deleteContact(id: string) {
  await assertPermission("contact");
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
}
