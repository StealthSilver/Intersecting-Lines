import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { prosePoemBodyClass } from "@/lib/article-body-classes";
import { markdownToHtml } from "@/lib/render-markdown";
import ArticleEngagement from "@/components/ArticleEngagement";
import AuthorByline from "@/components/AuthorByline";
import RecordVisit from "@/components/RecordVisit";
import { getAbsoluteSiteUrl } from "@/lib/site-url";

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

  const contentHtml = await markdownToHtml(content, true);

  const site = await getAbsoluteSiteUrl();
  const shareUrl = `${site}/poems/${slug}`;

  return (
    <main className="relative min-h-screen text-[#21201f] dark:text-[#E0E0DA] pb-20 md:pb-0 transition-colors duration-300">
      <RecordVisit section="poems" slug={slug} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 md:pr-20 pt-20 sm:pt-24 md:pt-28">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl text-[#1F6F78] dark:text-[#4A9BA3] mb-6 sm:mb-8 text-center leading-tight transition-colors duration-300"
          style={{ fontFamily: "var(--font-snippet)" }}
        >
          {data.title}
        </h1>

        <div className="text-xs sm:text-sm text-zinc-600 dark:text-[#B0B0A0] mb-4 sm:mb-6 text-center font-light transition-colors duration-300">
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

        <ArticleEngagement shareUrl={shareUrl} title={data.title} />

        <div
          className={prosePoemBodyClass}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <AuthorByline name={data.author as string | undefined} />
      </article>
    </main>
  );
}
