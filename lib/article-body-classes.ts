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
  "mt-10 sm:mt-12",
  invert,
  "prose-headings:scroll-mt-24 prose-h1:mt-10 prose-h1:mb-4 prose-h2:mt-10 prose-h2:mb-3 prose-h3:mt-8 prose-h3:mb-3",
  "prose-p:mt-0 prose-p:mb-[1.35em] prose-p:text-base prose-p:leading-[1.75] sm:prose-p:leading-8",
  "prose-ul:my-6 prose-ol:my-6 prose-ul:pl-5 prose-ol:pl-5",
  "prose-li:my-2 sm:prose-li:my-1.5",
  "prose-hr:my-10",
  blockquote,
  links,
].join(" ");

/** Poems: line breaks via `<br>`; blank lines in MD become paragraphs (stanzas). */
export const prosePoemBodyClass = [
  "poem-body prose prose-base max-w-none font-reading text-left leading-relaxed",
  "mt-10 sm:mt-12",
  invert,
  "prose-p:mt-0 prose-p:mb-[1.75em] sm:prose-p:mb-10 prose-p:text-base prose-p:leading-[1.95]",
  blockquote,
  links,
].join(" ");
