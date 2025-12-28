import Featured from "@/components/sections/Featured";

const Hero = () => {
  return (
    <section className="flex flex-col min-h-screen relative text-[#1F6F78] dark:text-[#4A9BA3] pt-16 md:pt-0 bg-[#F5F5F0] dark:bg-[#1E1E1E] transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 text-center py-12 md:py-0">
        <div className="max-w-4xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            Welcome to Intersecting Lines
          </h1>
          <p
            className="mt-3 sm:mt-4 text-semibold sm:text-lg md:text-xl"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            A place for essays, stories & poems
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-20 md:pb-6">
        <Featured />
      </div>
    </section>
  );
};

export default Hero;
