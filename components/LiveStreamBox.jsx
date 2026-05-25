"use client";

import Image from "next/image";

const STREAM_EMBED = "https://mercury.streambridge.link:8042/telugu/metrotv/embed.html";

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

      {/* Streambridge embed — same player as old HTML site, works on all devices */}
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
