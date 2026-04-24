import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CollectionFolder = "poems" | "essays" | "stories" | "books";

export type CollectionListItem = {
  slug: string;
  title: string;
  description: string;
  dateMs: number;
};

function parseDateMs(data: { date?: unknown }): number {
  if (data.date == null || data.date === "") return 0;
  const t = new Date(String(data.date)).getTime();
  return Number.isFinite(t) ? t : 0;
}

/** Newest first (by frontmatter `date`). Items without a valid date sort last. */
export function getCollectionSortedByDate(folder: CollectionFolder): CollectionListItem[] {
  const dir = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const items: CollectionListItem[] = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(/\.md$/, ""),
      title: (data.title as string) || "Untitled",
      description: (data.description as string) || (data.excerpt as string) || "",
      dateMs: parseDateMs(data),
    };
  });

  return items.sort((a, b) => b.dateMs - a.dateMs);
}
