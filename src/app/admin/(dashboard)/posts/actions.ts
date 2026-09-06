"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertPermission } from "@/lib/auth-server";
import { slugify } from "@/lib/slug";

export interface PostInput {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
  blogAuthorId?: string | null;
  /** "YYYY-MM-DD" from the date input. Null/omitted means "use today" (or keep the existing date on update). */
  publishedAt?: string | null;
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base);
  let candidate = root;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

export async function savePost(input: PostInput): Promise<{ id: string; slug: string }> {
  const session = await assertPermission("posts");

  const slug = await uniqueSlug(input.slug || input.title, input.id);
  const base = {
    title: input.title.trim() || "Untitled",
    slug,
    excerpt: input.excerpt?.trim() || null,
    content: input.content,
    coverImage: input.coverImage?.trim() || null,
    tags: input.tags,
    status: input.status,
    blogAuthorId: input.blogAuthorId || null,
  };

  // A caller-chosen date (from the date input) always wins — this is what
  // lets an editor backdate an older article being uploaded today, or fix
  // a wrong date after the fact. Falls back to the existing/current date
  // only when the field was left blank.
  const chosenDate = input.publishedAt ? new Date(input.publishedAt) : null;

  let result: { id: string; slug: string };

  if (input.id) {
    const existing = await prisma.post.findUnique({ where: { id: input.id } });
    const publishedAt =
      input.status === "PUBLISHED" ? chosenDate ?? existing?.publishedAt ?? new Date() : null;
    const updated = await prisma.post.update({
      where: { id: input.id },
      data: { ...base, publishedAt },
    });
    result = { id: updated.id, slug: updated.slug };
  } else {
    const created = await prisma.post.create({
      data: {
        ...base,
        publishedAt: input.status === "PUBLISHED" ? chosenDate ?? new Date() : null,
        authorId: (session.uid as string) ?? null,
      },
    });
    result = { id: created.id, slug: created.slug };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath(`/journal/${result.slug}`);
  return result;
}

export async function deletePost(id: string): Promise<void> {
  await assertPermission("posts");
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  revalidatePath("/journal");
}
