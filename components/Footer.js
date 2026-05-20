import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Video, Smartphone, Apple, ExternalLink } from "lucide-react";
import { getMetroCmsData } from "../lib/metroCms";

const fallbackSettings = {
  youtubechannelurl: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
  googleplayurl:     "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appstoreurl:       "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
  instagramurl:      "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm",
  facebookurl:       "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr",
  mainphone:         "+91 40-40159550",
  mainemail:         "admin@metrotvtelugu.com",
  officeaddress:     "603, Above Axis Bank, Maruthi Plaza, Khairathabad, Hyderabad - 500004, Telangana, India",
};

function get(settings, key) {
  return settings?.[key] || fallbackSettings[key];
}

function SocialImage({ src, alt }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <Image src={src} alt={alt} width={20} height={20} className="object-contain" />
    </span>
  );
}

export default async function Footer() {
  const cmsData  = await getMetroCmsData("settings");
  const settings = cmsData || {};

  const youtubeUrl   = get(settings, "youtubechannelurl");
  const playStoreUrl = get(settings, "googleplayurl");
  const appStoreUrl  = get(settings, "appstoreurl");
  const instagramUrl = get(settings, "instagramurl");
  const facebookUrl  = get(settings, "facebookurl");
  const phone        = get(settings, "mainphone");
  const email        = get(settings, "mainemail");
  const address      = get(settings, "officeaddress");

  return (
    <footer
      style={{
        background:   "var(--footer-bg)",
        borderTop:    "1px solid var(--border)",
        marginTop:    "80px",
      }}
    >
      {/* Red top accent line */}
      <div style={{ height: "3px", background: "var(--red)", opacity: 0.9 }} />

      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-4">

          {/* ── BRAND COL ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="overflow-hidden rounded-xl border p-1"
                style={{ borderColor: "var(--border-red)", background: "var(--card)" }}
              >
                <Image src="/metrotvlogo.png" alt="Metro TV Telugu" width={110} height={62} />
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7" style={{ color: "var(--muted)" }}>
              Regional news, public-interest stories, shows, videos, Shorts, app access
              and digital media opportunities for today&apos;s Telugu-speaking audience.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
                className="theme-toggle inline-flex h-9 w-9 items-center justify-center p-0">
                <SocialImage src="/instagram.png" alt="Instagram" />
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="theme-toggle inline-flex h-9 w-9 items-center justify-center p-0">
                <SocialImage src="/facebook.png" alt="Facebook" />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube"
                className="theme-toggle inline-flex h-9 w-9 items-center justify-center p-0">
                <Video className="h-4 w-4" style={{ color: "var(--red)" }} />
              </a>
            </div>

            {/* Contact details */}
            <div className="mt-6 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                <span>{phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                <span>{email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                <span className="leading-6">{address}</span>
              </div>
            </div>
          </div>

          {/* ── EXPLORE ── */}
          <div>
            <h3
              className="mb-4 text-xs font-black uppercase tracking-widest"
              style={{ color: "var(--red)" }}
            >
              Explore
            </h3>
            <div className="grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              {[
                { href: "/",          label: "Home"      },
                { href: "/videos",    label: "Videos"    },
                { href: "/shows",     label: "Shows"     },
                { href: "/advertise", label: "Advertise" },
                { href: "/about",     label: "About"     },
                { href: "/contact",   label: "Contact"   },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="hover:opacity-80 transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── DIGITAL ACCESS ── */}
          <div>
            <h3
              className="mb-4 text-xs font-black uppercase tracking-widest"
              style={{ color: "var(--red)" }}
            >
              Watch &amp; Follow
            </h3>
            <div className="grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <a href={youtubeUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition">
                <Video className="h-4 w-4" style={{ color: "var(--red)" }} />
                YouTube Channel
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href={playStoreUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition">
                <Smartphone className="h-4 w-4" style={{ color: "var(--red)" }} />
                Google Play
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href={appStoreUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition">
                <Apple className="h-4 w-4" style={{ color: "var(--red)" }} />
                App Store
                <ExternalLink className="h-3 w-3" />
              </a>
              <Link href="/advertise" className="hover:opacity-80 transition">Advertise with us</Link>
              <Link href="/contact"   className="hover:opacity-80 transition">Contact team</Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div>© {new Date().getFullYear()} Metro TV Telugu. All rights reserved.</div>
          <div style={{ color: "var(--red)", fontWeight: 600, letterSpacing: "0.1em" }}>
            NEWS • VIDEOS • SHOWS • APP • ADVERTISING
          </div>
        </div>
      </div>
    </footer>
  );
}