"use client";

import Image from "next/image";

const YOUTUBE_CHANNEL_ID = "UCVfnIT7ZU5dKG319O0ZPG2g";
const YOUTUBE_EMBED = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1`;

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

      {/* YouTube live embed — works on desktop, tablet, mobile, smart TV */}
      <div className="flex-1 p-4">
        <div className="embed-wrap">
          <iframe
            src={YOUTUBE_EMBED}
            title="Metro TV Telugu Live"
            frameBorder="0"
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
