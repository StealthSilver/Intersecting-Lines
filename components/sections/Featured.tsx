"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type FeaturedItem = {
  title: string;
  description: string;
  category: string;
  link: string;
};

const POLL_MS = 15_000;

export default function Featured() {
  const [items, setItems] = useState<FeaturedItem[] | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/featured", { cache: "no-store" });
      if (!res.ok) {
        setItems((prev) => prev ?? []);
        return;
      }
      const data = (await res.json()) as FeaturedItem[];
      if (Array.isArray(data)) setItems(data);
      else setItems((prev) => prev ?? []);
    } catch {
      setItems((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(() => void load(), POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  return (
    <section className="text-[#21201f] dark:text-[#E0E0DA] px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1F6F78] dark:text-[#4A9BA3] mb-6 sm:mb-8 md:mb-10 tracking-tight transition-colors duration-300"
          style={{ fontFamily: "var(--font-snippet)" }}
        >
          Start here
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {(items ?? []).map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="group bg-white/60 dark:bg-[#2A2A2A]/80 border border-zinc-300 dark:border-[#3A3A3A] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#1F6F78]/40 dark:hover:border-[#4A9BA3]/40 transition flex flex-col justify-between min-h-[200px] text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1F6F78] dark:focus-visible:outline-[#4A9BA3]"
            >
              <div>
                <p
                  className="text-xs sm:text-sm text-[#1F6F78] dark:text-[#4A9BA3] mb-2 uppercase tracking-wide transition-colors duration-300"
                  style={{ fontFamily: "var(--font-snippet)" }}
                >
                  {item.category}
                </p>
                <h3
                  className="text-lg sm:text-xl font-semibold text-[#21201f] dark:text-[#E0E0DA] mb-2 sm:mb-3 leading-snug transition-colors duration-300"
                  style={{ fontFamily: "var(--font-snippet)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-zinc-600 dark:text-[#B0B0A0] mb-4 sm:mb-6 line-clamp-3 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-palanquin)" }}
                >
                  {item.description}
                </p>
              </div>
              <span
                className="text-[#1F6F78] dark:text-[#4A9BA3] group-hover:opacity-80 font-medium text-sm transition mt-auto inline-block"
                style={{ fontFamily: "var(--font-snippet)" }}
              >
                Read more →
              </span>
            </Link>
          ))}
          {items === null &&
            [0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-[#3A3A3A] bg-white/40 dark:bg-[#2A2A2A]/50 p-5 sm:p-6 min-h-[200px] animate-pulse"
              >
                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-600 rounded mb-3" />
                <div className="h-6 w-48 max-w-[75%] bg-zinc-200 dark:bg-zinc-600 rounded mb-3" />
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-700 rounded mb-2" />
                <div className="h-3 w-11/12 bg-zinc-100 dark:bg-zinc-700 rounded" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
