"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Shows" },
  { href: "/news", label: "News" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl" style={{ background: "var(--bg-soft)" }}>
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
            <Image
              src="/metrotvlogo.png"
              alt="Metro TV Telugu"
              width={140}
              height={78}
              priority
            />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold tracking-[0.22em]">METRO TV TELUGU</div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              Broadcast • News • Digital
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "font-semibold" : "transition hover:opacity-80"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary text-sm">
            Advertise with us
          </Link>
        </div>
      </div>
    </header>
  );
}
