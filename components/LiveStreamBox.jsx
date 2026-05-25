"use client";

import Image from "next/image";

const STREAM_EMBED = "https://mercury.streambridge.link:8042/telugu/metrotv/embed.html";

export default function LiveStreamBox() {
  return (
    <div className="flex flex-col" style={{ background: "var(--bg-card)", height: "100%" }}>
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Image
          src="/metrotvlogo.png"
          alt="Metro TV Telugu"
          width={90}
          height={50}
          priority
          className="rounded-lg"
        />
        <span
          className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white"
          style={{ background: "var(--red)", letterSpacing: "0.14em" }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-white"
            style={{ animation: "livepulse 1.4s infinite" }}
          />
          LIVE
        </span>
      </div>

      {/* Streambridge embed — same player the old HTML site used, works on all devices */}
      <div className="flex-1 p-4">
        <div className="embed-wrap">
          <iframe
            src={STREAM_EMBED}
            title="Metro TV Telugu Live"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen"
          />
        </div>
      </div>

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
