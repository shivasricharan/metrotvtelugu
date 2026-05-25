"use client";

import Image from "next/image";
import { ExternalLink, Film, HeartPulse } from "lucide-react";

const STREAM_EMBED = "https://mercury.streambridge.link:8042/telugu/metrotv/embed.html";

const youtubeChannels = [
  {
    label: "Entertainment",
    name:  "Metro Entertainment TV",
    url:   "https://www.youtube.com/@MetroEntertainmentTv",
    color: "#f59e0b",
    bg:    "rgba(245,158,11,0.10)",
    border:"rgba(245,158,11,0.25)",
    Icon:  Film,
  },
  {
    label: "Health",
    name:  "Metro Health Updates",
    url:   "https://www.youtube.com/@metrohealthupdates",
    color: "#4ade80",
    bg:    "rgba(74,222,128,0.10)",
    border:"rgba(74,222,128,0.25)",
    Icon:  HeartPulse,
  },
];

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
  return (
    <div className="flex flex-col" style={{ background: "var(--bg-card)", height: "100%" }}>
      {/* Header bar */}
      <div
        className="flex items-center justify-end px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
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

      {/* Streambridge embed */}
      <div className="p-4">
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

      {/* YouTube channels */}
      <div className="px-4 pb-3 flex flex-col gap-2">
        <div className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          Follow Us on YouTube
        </div>
        <div className="grid grid-cols-2 gap-2">
          {youtubeChannels.map((ch) => (
            <a
              key={ch.label}
              href={ch.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-opacity hover:opacity-80"
              style={{ background: ch.bg, border: `1px solid ${ch.border}`, textDecoration: "none" }}
            >
              {/* Channel-specific icon */}
              <ch.Icon className="h-4 w-4 flex-shrink-0" style={{ color: ch.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black" style={{ color: ch.color }}>{ch.label}</div>
                <div className="text-xs leading-4 truncate" style={{ color: "var(--muted)" }}>{ch.name}</div>
              </div>
              {/* YouTube badge */}
              <span
                className="inline-flex items-center justify-center rounded flex-shrink-0"
                style={{ background: "#ff0000", width: "20px", height: "14px" }}
              >
                <svg viewBox="0 0 24 24" width="10" height="10" fill="white">
                  <polygon points="9,7 19,12 9,17" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Facebook & Instagram */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        <div className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          Follow Us on Social
        </div>
        <div className="grid grid-cols-2 gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-opacity hover:opacity-80"
              style={{ background: s.color, border: `1px solid ${s.border}`, textDecoration: "none" }}
            >
              <Image src={s.src} alt={s.label} width={24} height={24} className="object-contain flex-shrink-0" />
              <div>
                <div className="text-xs font-black" style={{ color: "var(--text)" }}>{s.label}</div>
                <div className="text-xs leading-4" style={{ color: "var(--muted)" }}>{s.name}</div>
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
