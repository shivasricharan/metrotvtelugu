import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div
                className="overflow-hidden rounded-xl border p-1"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <Image
                  src="/metrotvlogo.png"
                  alt="Metro TV Telugu"
                  width={120}
                  height={68}
                />
              </div>
            </div>

            <p
              className="mt-4 max-w-xl text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              Metro TV Telugu brings regional news, public-interest stories, shows,
              videos and digital media opportunities together for today’s Telugu-speaking
              audience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Explore</h3>
            <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/">Home</Link>
              <Link href="/news">News</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/shows">Shows</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Business</h3>
            <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/advertise">Advertise with us</Link>
              <Link href="/contact">Contact team</Link>
              <Link href="/videos">Video showcase</Link>
              <Link href="/shows">Programs & shows</Link>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div>© {new Date().getFullYear()} Metro TV Telugu. All rights reserved.</div>
          <div>News • Digital • Advertising • Regional Stories</div>
        </div>
      </div>
    </footer>
  );
}