import { NextResponse } from "next/server";
import { incrementVisit } from "@/lib/visits-store";
import type { VisitSection } from "@/lib/visit-types";

const SECTIONS = new Set<VisitSection>(["poems", "stories", "essays"]);

function isVisitSection(s: string): s is VisitSection {
  return SECTIONS.has(s as VisitSection);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { section?: string; slug?: string };
    const section = body.section;
    const slug = body.slug;

    if (!section || !slug || typeof slug !== "string" || typeof section !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
    }

    if (!isVisitSection(section)) {
      return NextResponse.json({ ok: false, error: "Invalid section" }, { status: 400 });
    }

    if (slug.length === 0 || slug.length > 200 || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return NextResponse.json({ ok: false, error: "Invalid slug" }, { status: 400 });
    }

    try {
      incrementVisit(section, slug);
    } catch {
      return NextResponse.json({ ok: false, error: "Storage unavailable" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
