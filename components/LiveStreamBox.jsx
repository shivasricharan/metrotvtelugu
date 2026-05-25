"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Zengatv has a valid SSL certificate — no browser security warnings
const ZENGATV_EMBED =
  "https://www.zengatv.com/embed?v=d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html&t=live";

// Zengatv's own live page — works when opened directly in any browser
const ZENGATV_LIVE =
  "https://www.zengatv.com/live/d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html";

const socials = [
  {
    href:   "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm",
    src:    "/instagram.png",
    label:  "Instagram",
    name:   "@metrotv_telugu",
    color:  "rgba(225,48,108,0.12)",
    border: "rgba(225,48,108,0.25)",
  },
  {
    href:   "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr",
    src:    "/facebook.png",
    label:  "Facebook",
    name:   "Metro TV Telugu",
    color:  "rgba(24,119,242,0.12)",
    border: "rgba(24,119,242,0.25)",
  },
];

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
          width={130}
          height={72}
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

      {/* Player */}
      <div className="p-4">
        {/* Skeleton while detecting — avoids layout shift */}
        {isMobile === null && (
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#000", borderRadius: "12px", border: "1px solid var(--border)" }} />
        )}

        {/* Desktop: Zengatv iframe — valid SSL, no security warnings */}
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

        {/* Mobile: Zengatv blocks in-app embeds, so link out directly */}
        {isMobile === true && (
          <a
            href={ZENGATV_LIVE}
            target="_blank"
            rel="noreferrer"
            style={{
              position: "relative",
              display: "block",
              width: "100%",
              paddingBottom: "56.25%",
              borderRadius: "12px",
              border: "1px solid var(--border-red, rgba(232,0,29,0.35))",
              overflow: "hidden",
              background: "linear-gradient(135deg, #0f0f0f 0%, #1a0000 100%)",
              textDecoration: "none",
            }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 28px rgba(232,0,29,0.55)" }}>
                <Play className="h-7 w-7 text-white" style={{ marginLeft: "3px" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="text-sm font-black text-white" style={{ letterSpacing: "0.04em" }}>Watch Metro TV Telugu Live</div>
                <div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Tap to open live stream</div>
              </div>
              <span className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white" style={{ background: "var(--red)", letterSpacing: "0.14em" }}>
                <span className="inline-block h-2 w-2 rounded-full bg-white" style={{ animation: "livepulse 1.4s infinite" }} />
                TAP TO WATCH LIVE
              </span>
            </div>
          </a>
        )}
      </div>

      {/* Social links */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <div className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          Follow Us
        </div>
        <div className="grid grid-cols-2 gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
              style={{ background: s.color, border: `1px solid ${s.border}`, textDecoration: "none" }}
            >
              <Image src={s.src} alt={s.label} width={32} height={32} className="object-contain flex-shrink-0" />
              <div>
                <div className="text-xs font-black" style={{ color: "var(--text)" }}>{s.label}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{s.name}</div>
              </div>
            </a>
          ))}
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
