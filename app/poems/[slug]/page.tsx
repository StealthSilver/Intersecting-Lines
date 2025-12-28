import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Sidebar from "@/components/sections/Sidebar";

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content/poems", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="relative min-h-screen bg-[#F5F5F0] dark:bg-[#1E1E1E] text-[#21201f] dark:text-[#E0E0DA] pb-20 md:pb-0 transition-colors duration-300">
      <Navbar />
      <Sidebar />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 md:pr-20 pt-20 sm:pt-24 md:pt-28">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl text-[#1F6F78] dark:text-[#4A9BA3] mb-6 sm:mb-8 text-center leading-tight transition-colors duration-300"
          style={{ fontFamily: "var(--font-parisienne)" }}
        >
          {data.title}
        </h1>

        <div className="text-xs sm:text-sm text-zinc-600 dark:text-[#B0B0A0] mb-8 sm:mb-12 text-center font-light transition-colors duration-300">
          <span>{data.date}</span>
          {data.tags && (
            <div className="mt-2 flex justify-center gap-2 flex-wrap">
              {data.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-1 rounded-full bg-[#1F6F78]/10 dark:bg-[#4A9BA3]/20 text-[#1F6F78] dark:text-[#4A9BA3] text-xs uppercase tracking-wide transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="prose prose-sm sm:prose-base md:prose-lg max-w-none font-[var(--font-palanquin)] leading-relaxed text-left sm:text-justify
                     dark:prose-invert
                     prose-headings:font-bold prose-headings:text-[#21201f] dark:prose-headings:text-[#E0E0DA]
                     prose-p:mb-4 sm:prose-p:mb-6 prose-p:text-base sm:prose-p:text-lg prose-p:leading-7 sm:prose-p:leading-8
                     prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-[#1F6F78] dark:prose-blockquote:border-[#4A9BA3]
                     prose-blockquote:bg-[#1F6F78]/5 dark:prose-blockquote:bg-[#4A9BA3]/10 prose-blockquote:px-3 sm:prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-md
                     prose-strong:text-[#1F6F78] dark:prose-strong:text-[#4A9BA3] prose-headings:text-xl sm:prose-headings:text-2xl prose-a:text-[#1F6F78] dark:prose-a:text-[#4A9BA3] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          style={{ fontFamily: "var(--font-palanquin)" }}
        />
      </article>
    </main>
  );
}
