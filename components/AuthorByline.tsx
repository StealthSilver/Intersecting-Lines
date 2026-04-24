type AuthorBylineProps = {
  name: string | undefined;
};

/** Renders below article body when frontmatter includes `author`. */
export default function AuthorByline({ name }: AuthorBylineProps) {
  const trimmed = name?.trim();
  if (!trimmed) return null;

  return (
    <footer className="mt-12 sm:mt-14 pt-8 border-t border-zinc-200/90 dark:border-[#3A3A3A] text-center">
      <p className="font-reading text-base sm:text-lg text-zinc-700 dark:text-[#C8C8BC]">
        <span
          className="mb-1 block text-xs uppercase tracking-[0.18em] text-[#1F6F78]/85 dark:text-[#4A9BA3]/85"
          style={{ fontFamily: "var(--font-snippet)" }}
        >
          Author
        </span>
        <span className="text-[#21201f] dark:text-[#E0E0DA]">{trimmed}</span>
      </p>
    </footer>
  );
}
