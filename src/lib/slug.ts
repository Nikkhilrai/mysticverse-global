export function slugify(input: string): string {
  return (
    input
      // Strip accents first ("Renàtà" → "renata", not "ren-t-") — already-
      // ASCII slugs are unchanged, so existing post URLs are unaffected.
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}
