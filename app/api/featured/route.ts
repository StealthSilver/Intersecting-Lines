import { NextResponse } from "next/server";
import { getFeaturedByVisits } from "@/lib/featured-picks";

export async function GET() {
  const items = getFeaturedByVisits();
  return NextResponse.json(items, {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
