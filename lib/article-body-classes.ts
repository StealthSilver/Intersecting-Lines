/**
 * Article markdown bodies: use `prose-base` everywhere (no `prose-sm` / `md:prose-lg`)
 * so spacing and type rhythm match across mobile and large screens.
 */
const invert = [
  "dark:prose-invert",
  "prose-headings:font-bold",
  "prose-headings:text-[#21201f]",
  "dark:prose-headings:text-[#E0E0DA]",
].join(" ");

const blockquote = [
  "prose-blockquote:italic",
  "prose-blockquote:border-l-4",
  "prose-blockquote:border-[#1F6F78]",
  "dark:prose-blockquote:border-[#4A9BA3]",
  "prose-blockquote:bg-[#1F6F78]/5",
  "dark:prose-blockquote:bg-[#4A9BA3]/10",
  "prose-blockquote:px-4",
  "prose-blockquote:py-2",
  "prose-blockquote:rounded-md",
].join(" ");

const links = [
  "prose-strong:text-[#1F6F78]",
  "dark:prose-strong:text-[#4A9BA3]",
  "prose-headings:text-xl",
  "prose-a:text-[#1F6F78]",
  "dark:prose-a:text-[#4A9BA3]",
  "prose-a:no-underline",
  "hover:prose-a:underline",
].join(" ");

/** Stories, essays, books: paragraph rhythm and lists; justify from `sm` up only. */
export const proseNarrativeBodyClass = [
  "prose prose-base max-w-none font-reading leading-relaxed text-left sm:text-justify",
  invert,
  "prose-p:my-0 prose-p:mb-6 prose-p:text-base prose-p:leading-8",
  "prose-ul:my-4 prose-ol:my-4",
  "prose-li:my-1",
  blockquote,
  links,
].join(" ");

/** Poems: line breaks via `<br>`; blank lines in MD become paragraphs (stanzas). */
export const prosePoemBodyClass = [
  "poem-body prose prose-base max-w-none font-reading text-left leading-relaxed",
  invert,
  "prose-p:my-0 prose-p:mb-8 prose-p:text-base prose-p:leading-[1.9]",
  blockquote,
  links,
].join(" ");
