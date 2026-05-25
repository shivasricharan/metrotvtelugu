import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "/shows",     label: "Shows"     },
  { href: "/videos",    label: "Videos"    },
  { href: "/about",     label: "About"     },
  { href: "/advertise", label: "Advertise" },
  { href: "/contact",   label: "Contact"   },
];

export default function Header() {
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
        <div
          className="flex items-center justify-between"
          style={{ height: "64px" }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/metrotvlogo.png"
              alt="Metro TV Telugu"
              width={80}
              height={45}
              priority
            />
          </Link>

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
              href="https://www.zengatv.com/embed?v=d6361881-b3e4-4006-a8f8-73e1a78b8bc1.html&t=live"
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
        </div>
      </div>

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </header>
  );
}
