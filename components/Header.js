"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, Apple, Download } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const playStoreLink = "https://play.google.com/store/apps/details?id=com.ht.metro_tv";
const appStoreLink  = "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666";
const instagramLink = "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm";
const facebookLink  = "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr";

/* News removed per client decision — channel is live on Jio TV & YouTube */
const links = [
  { href: "/",         label: "Home"      },
  { href: "/videos",   label: "Videos"    },
  { href: "/shows",    label: "Shows"     },
  { href: "/advertise",label: "Advertise" },
  { href: "/about",    label: "About"     },
  { href: "/contact",  label: "Contact"   },
];

function SocialIcon({ src, alt }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <Image src={src} alt={alt} width={20} height={20} className="object-contain" />
    </span>
  );
}

export default function Header() {
  const pathname     = usePathname();
  const [open, setOpen]           = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      <div className="container flex items-center justify-between gap-4 py-3">

        {/* ── LOGO ── */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => { setOpen(false); setDownloadOpen(false); }}
        >
          <div
            className="overflow-hidden rounded-xl border p-1"
            style={{ borderColor: "var(--border-red)", background: "var(--card)" }}
          >
            <Image
              src="/metrotvlogo.png"
              alt="Metro TV Telugu"
              width={110}
              height={62}
              priority
            />
          </div>
          <div className="hidden 2xl:block">
            <div className="text-sm font-black tracking-[0.22em]" style={{ color: "var(--text)" }}>
              METRO TV TELUGU
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              News • Shows • Digital
            </div>
          </div>
        </Link>

        {/* ── LIVE PILL (desktop) ── */}
        <div className="hidden xl:flex items-center gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
            style={{ background: "var(--red)", letterSpacing: "0.16em" }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-white"
              style={{ animation: "navpulse 1.4s infinite" }}
            />
            LIVE
          </span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>Jio TV Box</span>
        </div>

        {/* ── NAV LINKS (desktop) ── */}
        <nav className="hidden xl:flex items-center gap-5 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "font-bold" : "transition hover:opacity-75"}
                style={{ color: active ? "var(--red)" : "var(--text)" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── RIGHT ACTIONS (desktop) ── */}
        <div className="hidden xl:flex items-center gap-3">
          <a
            href={instagramLink} target="_blank" rel="noreferrer"
            aria-label="Instagram"
            className="theme-toggle inline-flex h-9 w-9 items-center justify-center p-0"
          >
            <SocialIcon src="/instagram.png" alt="Instagram" />
          </a>
          <a
            href={facebookLink} target="_blank" rel="noreferrer"
            aria-label="Facebook"
            className="theme-toggle inline-flex h-9 w-9 items-center justify-center p-0"
          >
            <SocialIcon src="/facebook.png" alt="Facebook" />
          </a>

          <ThemeToggle />

          <div className="relative">
            <button
              type="button"
              className="btn-primary text-sm"
              onClick={() => setDownloadOpen((v) => !v)}
            >
              <Download className="h-4 w-4" />
              Download App
            </button>

            {downloadOpen && (
              <div
                className="absolute right-0 mt-3 w-52 rounded-2xl border p-2 shadow-2xl"
                style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
              >
                <a
                  href={playStoreLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:opacity-80"
                  onClick={() => setDownloadOpen(false)}
                  style={{ background: "var(--card)" }}
                >
                  <Smartphone className="h-4 w-4" style={{ color: "var(--red)" }} />
                  Google Play
                </a>
                <a
                  href={appStoreLink} target="_blank" rel="noreferrer"
                  className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:opacity-80"
                  onClick={() => setDownloadOpen(false)}
                  style={{ background: "var(--card)" }}
                >
                  <Apple className="h-4 w-4" style={{ color: "var(--red)" }} />
                  App Store
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {open && (
        <div
          className="xl:hidden border-t"
          style={{ borderColor: "var(--border)", background: "var(--nav-bg)" }}
        >
          <nav className="container grid gap-1 py-4 text-sm">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-medium"
                  style={{
                    background: active ? "var(--card-strong)" : "transparent",
                    color:      active ? "var(--red)"          : "var(--text)",
                    borderLeft: active ? "3px solid var(--red)" : "3px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Social */}
            <div
              className="mt-3 rounded-2xl border p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Follow Metro TV Telugu
              </div>
              <div className="flex gap-3">
                <a href={instagramLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  <SocialIcon src="/instagram.png" alt="Instagram" /> Instagram
                </a>
                <a href={facebookLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  <SocialIcon src="/facebook.png" alt="Facebook" /> Facebook
                </a>
              </div>
            </div>

            {/* App download */}
            <div
              className="mt-2 rounded-2xl border p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                <Download className="h-4 w-4" style={{ color: "var(--red)" }} />
                Download App
              </div>
              <div className="flex gap-3">
                <a href={playStoreLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  <Smartphone className="h-4 w-4" /> Google Play
                </a>
                <a href={appStoreLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  <Apple className="h-4 w-4" /> App Store
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes navpulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </header>
  );
}