import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getFeaturedContent() {
  const baseDir = path.join(process.cwd(), "content");

  const sections: { folder: string; display: string }[] = [
    { folder: "essays", display: "Essay" },
    { folder: "poems", display: "Poem" },
    { folder: "stories", display: "Story" },
  ];

  const items: {
    title: string;
    description: string;
    category: string;
    link: string;
  }[] = [];

  sections.forEach(({ folder, display }) => {
    const dir = path.join(baseDir, folder);

    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);

      files.forEach((filename) => {
        const filePath = path.join(dir, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        items.push({
          title: data.title || "Untitled",
          description: data.description || "",
          category: data.category || display,
          link: `/${folder}/${filename.replace(/\.md$/, "")}`,
        });
      });
    }
  });

  return items.slice(0, 3);
}
const Featured = () => {
  const featuredItems = getFeaturedContent();

  return (
    <section className="text-[#21201f] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#e34e30] mb-6 sm:mb-8 md:mb-10 tracking-tight"
          style={{ fontFamily: "var(--font-snippet)" }}
        >
          Featured Writings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {featuredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/60 border border-zinc-300 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg hover:border-[#e34e30]/40 transition flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <p
                  className="text-xs sm:text-sm text-[#e34e30] mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-snippet)" }}
                >
                  {item.category}
                </p>
                <h3
                  className="text-lg sm:text-xl font-semibold text-[#21201f] mb-2 sm:mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-snippet)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-zinc-600 mb-4 sm:mb-6 line-clamp-3"
                  style={{ fontFamily: "var(--font-palanquin)" }}
                >
                  {item.description}
                </p>
              </div>
              <Link
                href={item.link}
                className="text-[#e34e30] hover:opacity-80 font-medium text-sm transition mt-auto inline-block"
                style={{ fontFamily: "var(--font-snippet)" }}
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
