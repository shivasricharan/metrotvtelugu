"use client";

export default function LiveTVSection() {
  return (
    <section
      id="live-tv"
      style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      className="px-4 py-14"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* Section header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white"
              style={{ background: "var(--red)", letterSpacing: "0.18em" }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full bg-white"
                style={{ animation: "livepulse 1.4s infinite" }}
              />
              LIVE
            </span>
          </div>
          <h2
            className="text-3xl font-black md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Metro TV Telugu{" "}
            <span style={{ color: "var(--red)" }}>Live Stream</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Watch Metro TV Telugu live — also available on Jio TV Box Channel 5033
          </p>
        </div>

        {/* Video embed */}
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{
            aspectRatio: "16/9",
            background: "#000",
            border: "1px solid var(--border-red)",
            boxShadow: "0 0 40px rgba(232,0,29,0.15)",
          }}
        >
          <iframe
            src="https://www.zengatv.com/live/d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html"
            style={{ width: "100%", height: "100%", display: "block" }}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            title="Metro TV Telugu Live"
          />
        </div>

        {/* Platform info strip */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {[
            { label: "Jio TV Box Ch.5033", dot: "#60a5fa" },
            { label: "YouTube Live",       dot: "#ff4444" },
            { label: "Android & iOS App",  dot: "#4ade80" },
          ].map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted-light)",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: p.dot, flexShrink: 0 }}
              />
              {p.label}
            </span>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}