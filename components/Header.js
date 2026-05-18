"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, Apple, Download } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.ht.metro_tv";

const appStoreLink =
  "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666";

const instagramLink =
  "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm";

const facebookLink =
  "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr";

const links = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/advertise", label: "Advertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function SocialIcon({ src, alt }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className="object-contain"
      />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: "var(--bg-soft)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => {
            setOpen(false);
            setDownloadOpen(false);
          }}
        >
          <div
            className="overflow-hidden rounded-xl border p-1"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <Image
              src="/metrotvlogo.png"
              alt="Metro TV Telugu"
              width={120}
              height={68}
              priority
            />
          </div>

          <div className="hidden 2xl:block">
            <div
              className="text-sm font-bold tracking-[0.22em]"
              style={{ color: "var(--text)" }}
            >
              METRO TV TELUGU
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              News • Shows • Digital
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-5 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "font-semibold" : "transition hover:opacity-80"}
                style={{
                  color: active ? "var(--gold)" : "var(--text)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram"
              className="theme-toggle inline-flex h-10 w-10 items-center justify-center p-0"
              title="Instagram"
            >
              <SocialIcon src="/instagram.png" alt="Instagram" />
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Facebook"
              className="theme-toggle inline-flex h-10 w-10 items-center justify-center p-0"
              title="Facebook"
            >
              <SocialIcon src="/facebook.png" alt="Facebook" />
            </a>
          </div>

          <ThemeToggle />

          <div className="relative">
            <button
              type="button"
              className="btn-primary text-sm"
              onClick={() => setDownloadOpen((value) => !value)}
            >
              <Download className="h-4 w-4" />
              Download App
            </button>

            {downloadOpen && (
              <div
                className="absolute right-0 mt-3 w-56 rounded-3xl border p-3 shadow-2xl"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <a
                  href={playStoreLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:opacity-80"
                  onClick={() => setDownloadOpen(false)}
                  style={{ background: "var(--card)" }}
                >
                  <Smartphone className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <span>Google Play</span>
                </a>

                <a
                  href={appStoreLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:opacity-80"
                  onClick={() => setDownloadOpen(false)}
                  style={{ background: "var(--card)" }}
                >
                  <Apple className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <span>App Store</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="xl:hidden border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-soft)",
          }}
        >
          <nav className="container grid gap-2 py-4 text-sm">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3"
                  style={{
                    background: active ? "var(--card-strong)" : "transparent",
                    color: active ? "var(--gold)" : "var(--text)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <div
              className="mt-3 rounded-3xl border p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="mb-3 text-sm font-semibold">
                Follow Metro TV Telugu
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-sm"
                >
                  <SocialIcon src="/instagram.png" alt="Instagram" />
                  Instagram
                </a>

                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-sm"
                >
                  <SocialIcon src="/facebook.png" alt="Facebook" />
                  Facebook
                </a>
              </div>
            </div>

            <div
              className="mt-3 rounded-3xl border p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Download className="h-4 w-4" style={{ color: "var(--gold)" }} />
                Download Metro TV Telugu App
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={playStoreLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-sm"
                >
                  <Smartphone className="h-4 w-4" />
                  Google Play
                </a>

                <a
                  href={appStoreLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-sm"
                >
                  <Apple className="h-4 w-4" />
                  App Store
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}