export default function LiveTVSection() {
  return (
    <section id="live-tv" className="bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
            Watch Live
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Metro TV Telugu Live
          </h2>

          <p className="mt-3 text-slate-300">
            Watch Metro TV Telugu live stream online.
          </p>
        </div>

        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <iframe
            src="https://www.zengatv.com/embed?v=d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html&t=live"
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            title="Metro TV Telugu Live"
          />
        </div>
      </div>
    </section>
  );
}
