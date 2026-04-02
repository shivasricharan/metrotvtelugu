import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-xl border p-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <Image
                  src="/metrotvlogo.png"
                  alt="Metro TV Telugu"
                  width={120}
                  height={68}
                />
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "var(--muted)" }}>
              A premium Metro TV Telugu digital demo designed to present a stronger content,
              video and advertiser-first website experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Explore</h3>
            <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/">Home</Link>
              <Link href="/shows">Shows</Link>
              <Link href="/news">News</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Demo purpose</h3>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
              This is a pitch-ready prototype to show how Metro TV Telugu can look live,
              premium, modern and advertiser-friendly before the full build starts.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          Metro TV Telugu • Demo Prototype
        </div>
      </div>
    </footer>
  );
}
