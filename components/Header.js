"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/advertise", label: "Advertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(false)}
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
              width={132}
              height={74}
              priority
            />
          </div>

          <div className="hidden lg:block">
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

        <nav className="hidden lg:flex items-center gap-7 text-sm">
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

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/advertise" className="btn-primary text-sm">
            Advertise with us
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
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
          className="lg:hidden border-t"
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

            <Link
              href="/advertise"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-sm"
            >
              Advertise with us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}