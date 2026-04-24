"use client";

import { useEffect } from "react";
import type { VisitSection } from "@/lib/visit-types";

export default function RecordVisit({
  section,
  slug,
}: {
  section: VisitSection;
  slug: string;
}) {
  useEffect(() => {
    void fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, slug }),
    });
  }, [section, slug]);

  return null;
}
