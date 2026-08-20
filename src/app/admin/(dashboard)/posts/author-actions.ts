"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";

export interface AuthorInput {
  id?: string;
  name: string;
  role?: string;
  image?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

function clean(v?: string): string | null {
  const t = v?.trim();
  return t ? t : null;
}

export async function listAuthors() {
  return prisma.blogAuthor.findMany({ orderBy: { name: "asc" } });
}

export async function saveAuthor(input: AuthorInput) {
  await assertPermission("posts");
  const name = input.name.trim();
  if (!name) throw new Error("Author name is required.");

  const data = {
    name,
    role: clean(input.role),
    image: clean(input.image),
    bio: clean(input.bio),
    email: clean(input.email),
    linkedin: clean(input.linkedin),
    twitter: clean(input.twitter),
    website: clean(input.website),
  };

  const author = input.id
    ? await prisma.blogAuthor.update({ where: { id: input.id }, data })
    : await prisma.blogAuthor.create({ data });

  revalidatePath("/admin/posts");
  revalidatePath("/journal");
  return author;
}

export async function deleteAuthor(id: string) {
  await assertPermission("posts");
  await prisma.blogAuthor.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/journal");
}
