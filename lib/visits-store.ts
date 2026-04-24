import fs from "fs";
import path from "path";
import type { VisitSection } from "@/lib/visit-types";

export type { VisitSection } from "@/lib/visit-types";

const DATA_DIR = path.join(process.cwd(), "data");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");

export type VisitsMap = Record<string, number>;

export function visitKey(section: VisitSection, slug: string): string {
  return `${section}:${slug}`;
}

export function readVisits(): VisitsMap {
  try {
    if (!fs.existsSync(VISITS_FILE)) return {};
    const raw = fs.readFileSync(VISITS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as VisitsMap;
    }
    return {};
  } catch {
    return {};
  }
}

export function writeVisits(map: VisitsMap): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(VISITS_FILE, JSON.stringify(map, null, 2), "utf-8");
}

export function incrementVisit(section: VisitSection, slug: string): VisitsMap {
  const map = { ...readVisits() };
  const key = visitKey(section, slug);
  map[key] = (map[key] ?? 0) + 1;
  writeVisits(map);
  return map;
}
