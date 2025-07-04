export function Home() {
  return (
    <section id="home">
      <img
        src="/favicon-rounded.ico"
        alt="CCCN Lab Logo"
        className="mx-auto mb-6 w-20 h-auto" // ปรับขนาดตามต้องการตรง w-
      />
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-4 leading-tight">
        COGNITIVE <br />
        CLINICAL & <br />
        COMPUTATIONAL <br />
        NEUROSCIENCE
      </h1>
      <div className="py-6 text-md text-zinc-100 max-w-2xl mx-auto">
        <p className="italic">
          "Curiosity. Critical Thinking. Creativity. Nerds!"
        </p>
        <p className="mt-2 text-sm ">– Chunharas C., 2025 –</p>
      </div>
    </section>
  );
}
