"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "/shows",     label: "Shows"     },
  { href: "/videos",    label: "Videos"    },
  { href: "/about",     label: "About"     },
  { href: "/advertise", label: "Advertise" },
  { href: "/contact",   label: "Contact"   },
];

const LIVE_URL =
  "https://www.zengatv.com/live/d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html";


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--nav-bg)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "64px" }}>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
            <Image src="/metrotvlogo.png" alt="Metro TV Telugu" width={80} height={45} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold px-3 py-1.5 rounded-md transition-colors hover:bg-white/10"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-white px-3 py-1.5 rounded-md ml-1 hover:opacity-90 transition-opacity"
              style={{ background: "var(--red)", letterSpacing: "0.06em" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-white"
                style={{ animation: "livepulse 1.4s infinite", flexShrink: 0 }}
              />
              Live TV
            </a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile: live badge + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-black text-white px-2.5 py-1.5 rounded-md"
              style={{ background: "var(--red)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-white"
                style={{ animation: "livepulse 1.4s infinite" }}
              />
              Live
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              style={{ color: "#fff" }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div
          style={{
            background: "var(--nav-bg)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="container py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                {l.label}
              </Link>
            ))}
            <div
              className="flex items-center justify-between px-3 py-2 mt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.50)" }}>
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </header>
  );
}
