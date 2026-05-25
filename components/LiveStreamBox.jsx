"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const ZENGATV_EMBED =
  "https://www.zengatv.com/embed?v=d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html&t=live";
const YOUTUBE_LIVE = "https://www.youtube.com/@metrotvtelugunews/live";

export default function LiveStreamBox() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

      {/* Player area */}
      <div className="flex-1 p-4">
        {/* Skeleton while detecting device — avoids layout shift */}
        {isMobile === null && (
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              background: "#000",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          />
        )}

        {/* Desktop: Zengatv iframe */}
        {isMobile === false && (
          <div className="embed-wrap">
            <iframe
              src={ZENGATV_EMBED}
              title="Metro TV Telugu Live"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen"
            />
          </div>
        )}

        {/* Mobile: tap-to-watch card (Zengatv blocks mobile browsers) */}
        {isMobile === true && (
          <a
            href={YOUTUBE_LIVE}
            target="_blank"
            rel="noreferrer"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              width: "100%",
              paddingBottom: "56.25%",
              background: "linear-gradient(135deg, #0f0f0f 0%, #1a0000 100%)",
              borderRadius: "12px",
              border: "1px solid var(--border-red, rgba(232,0,29,0.35))",
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--red)",
                  boxShadow: "0 0 28px rgba(232,0,29,0.55)",
                }}
              >
                <Play className="h-7 w-7 text-white" style={{ marginLeft: "3px" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="text-sm font-black text-white"
                  style={{ letterSpacing: "0.04em" }}
                >
                  Watch Metro TV Telugu Live
                </div>
                <div
                  className="mt-1 text-xs"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Opens YouTube — works on all mobile devices
                </div>
              </div>
              <span
                className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white"
                style={{ background: "var(--red)", letterSpacing: "0.14em" }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full bg-white"
                  style={{ animation: "livepulse 1.4s infinite" }}
                />
                TAP TO WATCH LIVE
              </span>
            </div>
          </a>
        )}
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
