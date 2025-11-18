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
    <main className="min-h-screen bg-[#ecede8] text-[#21201f] relative pb-20 md:pb-0">
      <Navbar />

      <section className="pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-6 md:pr-20">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e34e30] mb-6 sm:mb-8 md:mb-10"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            Poems
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {poems.map((poem) => (
              <div
                key={poem.slug}
                className="bg-white border border-zinc-300 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg hover:border-[#e34e30]/40 transition flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <h2
                    className="text-lg sm:text-xl font-semibold text-[#21201f] mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-parisienne)" }}
                  >
                    {poem.title}
                  </h2>
                  <p
                    className="text-sm text-zinc-600 mb-4 sm:mb-6 line-clamp-3"
                    style={{ fontFamily: "var(--font-palanquin)" }}
                  >
                    {poem.description}
                  </p>
                </div>
                <Link
                  href={`/poems/${poem.slug}`}
                  className="text-[#e34e30] hover:opacity-80 font-medium text-sm transition mt-auto inline-block"
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
