"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertAdmin } from "@/lib/auth-server";
import { hashPassword } from "@/lib/password";
import { isResourceKey } from "@/lib/permissions";

export interface TeamUserInput {
  id?: string;
  name: string;
  email: string;
  password?: string; // required on create; optional on update (blank = keep current)
  role: "ADMIN" | "EDITOR";
  permissions: string[];
}

export interface TeamUserLite {
  id: string;
  name: string | null;
  email: string;
  role: string;
  permissions: string[];
  createdAt: Date;
}

function toLite(u: {
  id: string;
  name: string | null;
  email: string;
  role: string;
  permissions: string[];
  createdAt: Date;
}): TeamUserLite {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    permissions: u.permissions,
    createdAt: u.createdAt,
  };
}

export async function listUsers(): Promise<TeamUserLite[]> {
  await assertAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return users.map(toLite);
}

export async function saveUser(input: TeamUserInput): Promise<TeamUserLite> {
  await assertAdmin();

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (!name) throw new Error("A name is required.");
  if (!email) throw new Error("An email is required.");

  const permissions = input.permissions.filter(isResourceKey);

  if (!input.id) {
    // ── Create ──
    if (!input.password || input.password.length < 8) {
      throw new Error("A password of at least 8 characters is required.");
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("An account with this email already exists.");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(input.password),
        role: input.role,
        permissions: input.role === "ADMIN" ? [] : permissions,
      },
    });
    revalidatePath("/admin/team");
    return toLite(user);
  }

  // ── Update ──
  if (input.password && input.password.length > 0 && input.password.length < 8) {
    throw new Error("New password must be at least 8 characters.");
  }

  // Guard: don't let the last ADMIN demote themselves (or be demoted) into a lockout.
  if (input.role === "EDITOR") {
    const target = await prisma.user.findUnique({ where: { id: input.id } });
    if (target?.role === "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        throw new Error("Can't demote the only remaining admin.");
      }
    }
  }

  const user = await prisma.user.update({
    where: { id: input.id },
    data: {
      name,
      email,
      role: input.role,
      permissions: input.role === "ADMIN" ? [] : permissions,
      ...(input.password ? { passwordHash: await hashPassword(input.password) } : {}),
    },
  });
  revalidatePath("/admin/team");
  return toLite(user);
}

export async function deleteUser(id: string): Promise<void> {
  const session = await assertAdmin();

  if (session.uid === id) {
    throw new Error("You can't delete your own account while signed in.");
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      throw new Error("Can't delete the only remaining admin.");
    }
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/team");
}
