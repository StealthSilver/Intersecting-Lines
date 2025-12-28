import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Sidebar from "@/components/sections/Sidebar";

export default function PoemsPage() {
  const poemsDir = path.join(process.cwd(), "content/poems");
  const files = fs.readdirSync(poemsDir);

  const poems = files.map((filename) => {
    const filePath = path.join(poemsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      description: data.description || data.excerpt || "",
    };
  });

  return (
    <main className="min-h-screen bg-[#F5F5F0] dark:bg-[#1E1E1E] text-[#21201f] dark:text-[#E0E0DA] relative pb-20 md:pb-0 transition-colors duration-300">
      <Navbar />

      <section className="pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-6 md:pr-20">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F6F78] dark:text-[#4A9BA3] mb-6 sm:mb-8 md:mb-10 transition-colors duration-300"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            Poems
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {poems.map((poem) => (
              <div
                key={poem.slug}
                className="bg-white dark:bg-[#2A2A2A] border border-zinc-300 dark:border-[#3A3A3A] rounded-xl p-5 sm:p-6 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#1F6F78]/40 dark:hover:border-[#4A9BA3]/40 transition flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <h2
                    className="text-lg sm:text-xl font-semibold text-[#21201f] dark:text-[#E0E0DA] mb-2 leading-tight transition-colors duration-300"
                    style={{ fontFamily: "var(--font-snippet)" }}
                  >
                    {poem.title}
                  </h2>
                  <p
                    className="text-sm text-zinc-600 dark:text-[#B0B0A0] mb-4 sm:mb-6 line-clamp-3 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-palanquin)" }}
                  >
                    {poem.description}
                  </p>
                </div>
                <Link
                  href={`/poems/${poem.slug}`}
                  className="text-[#1F6F78] dark:text-[#4A9BA3] hover:opacity-80 font-medium text-sm transition mt-auto inline-block"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Sidebar />
    </main>
  );
}
