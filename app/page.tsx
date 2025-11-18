import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Sidebar from "@/components/sections/Sidebar";
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <div className="relative md:pr-14 lg:pr-16">
        <div className="absolute inset-0 bg-[url('/statue.png')] opacity-60 md:opacity-70 bg-cover bg-center pointer-events-none"></div>

        <div className="relative">
          <Hero />
        </div>
      </div>
      <Sidebar />
    </main>
  );
}
