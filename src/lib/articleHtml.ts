/*
  Render-time cleanup for blog HTML coming out of the CMS editor.

  Posts pasted in from Word / Google Docs often arrive as a single <p>
  with <br><br> between "paragraphs". That renders as one block that
  paragraph typography (spacing, the opening drop cap) can't address,
  so this splits each such <p> into real paragraphs and trims the
  stray trailing &nbsp; the paste leaves behind. The stored post is
  never modified — this only runs on the way out.
*/

const DOUBLE_BR = /(?:\s*<br\s*\/?>\s*){2,}/i;
const EDGE_SPACE_START = /^(?:&nbsp;|\s)+/i;
const EDGE_SPACE_END = /(?:&nbsp;|\s)+$/i;

export function normalizeArticleHtml(html: string): string {
  return html.replace(
    /<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi,
    (_match, attrs: string | undefined, inner: string) =>
      inner
        .split(DOUBLE_BR)
        .map((part) => part.replace(EDGE_SPACE_START, "").replace(EDGE_SPACE_END, ""))
        .filter((part) => part.length > 0)
        .map((part) => `<p${attrs ?? ""}>${part}</p>`)
        .join(""),
  );
}

const WORDS_PER_MINUTE = 220;

/** Estimated reading time in whole minutes (never less than 1). */
export function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
