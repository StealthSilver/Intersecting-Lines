import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import html from "remark-html";

/**
 * Markdown → HTML. `preserveLineBreaks` uses remark-breaks so single newlines
 * become `<br>` (needed for verse layout in poems).
 */
export async function markdownToHtml(
  raw: string,
  preserveLineBreaks: boolean
): Promise<string> {
  const body = raw.trim();
  if (preserveLineBreaks) {
    const file = await remark().use(remarkBreaks).use(html).process(body);
    return String(file);
  }
  const file = await remark().use(html).process(body);
  return String(file);
}
