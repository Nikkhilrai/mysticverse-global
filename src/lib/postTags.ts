/*
  Tag conventions for blog posts.

  A post tagged "Press Release" (any case) renders in press-release
  mode on /journal: a "Press Release" kicker, a styled dateline, an
  "At a Glance" fact card, and its remaining tags shown as hashtags.
  Editors switch it on from the admin by adding the tag.
*/

export const PRESS_RELEASE_TAG = "Press Release";

const isPressTag = (t: string) => t.trim().toLowerCase() === PRESS_RELEASE_TAG.toLowerCase();

export function isPressRelease(tags: readonly string[]): boolean {
  return tags.some(isPressTag);
}

/** The post's other tags as bare hashtag words ("#Foo" → "Foo"), deduped. */
export function hashtags(tags: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of tags) {
    if (isPressTag(raw)) continue;
    const word = raw.trim().replace(/^#+/, "");
    const key = word.toLowerCase();
    if (word && !seen.has(key)) {
      seen.add(key);
      out.push(word);
    }
  }
  return out;
}
