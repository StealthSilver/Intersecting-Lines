import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readVisits, visitKey } from "@/lib/visits-store";
import type { VisitSection } from "@/lib/visit-types";

export type FeaturedApiItem = {
  title: string;
  description: string;
  category: string;
  link: string;
};

const FEATURED_FOLDERS: VisitSection[] = ["poems", "stories", "essays"];

const DEFAULT_CATEGORY: Record<VisitSection, string> = {
  poems: "Poem",
  stories: "Story",
  essays: "Essay",
};

function parseDateMs(data: { date?: unknown }): number {
  if (data.date == null || data.date === "") return 0;
  const t = new Date(String(data.date)).getTime();
  return Number.isFinite(t) ? t : 0;
}

type FolderItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  link: string;
  dateMs: number;
};

function loadItemsForFolder(folder: VisitSection): FolderItem[] {
  const dir = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        title: (data.title as string) || "Untitled",
        description: (data.description as string) || (data.excerpt as string) || "",
        category: (data.category as string) || DEFAULT_CATEGORY[folder],
        link: `/${folder}/${slug}`,
        dateMs: parseDateMs(data),
      };
    });
}

function pickTopForFolder(
  folder: VisitSection,
  visits: Record<string, number>
): FolderItem | null {
  const items = loadItemsForFolder(folder);
  if (items.length === 0) return null;

  const sorted = [...items].sort((a, b) => {
    const va = visits[visitKey(folder, a.slug)] ?? 0;
    const vb = visits[visitKey(folder, b.slug)] ?? 0;
    if (vb !== va) return vb - va;
    if (b.dateMs !== a.dateMs) return b.dateMs - a.dateMs;
    return a.title.localeCompare(b.title);
  });

  return sorted[0] ?? null;
}

/** One poem, one story, one essay — highest visits per type; ties broken by newest `date`. */
export function getFeaturedByVisits(): FeaturedApiItem[] {
  const visits = readVisits();
  const out: FeaturedApiItem[] = [];

  for (const folder of FEATURED_FOLDERS) {
    const top = pickTopForFolder(folder, visits);
    if (top) {
      out.push({
        title: top.title,
        description: top.description,
        category: top.category,
        link: top.link,
      });
    }
  }

  return out;
}
