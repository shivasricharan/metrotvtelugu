import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Video,
  Smartphone,
  Apple,
  ExternalLink,
} from "lucide-react";
import { getMetroCmsData } from "../lib/metroCms";

const fallbackSettings = {
  youtubechannelurl: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
  googleplayurl: "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appstoreurl: "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
  mainphone: "+91 40-40159550",
  mainemail: "admin@metrotvtelugu.com",
  officeaddress:
    "603, Above Axis Bank, Maruthi Plaza, Khairathabad, Hyderabad - 500004, Telangana, India",
};

function getSetting(settings, key, fallback) {
  return settings?.[key] || fallback;
}

export default async function Footer() {
  const cmsData = await getMetroCmsData("settings");
  const settings = cmsData || {};

  const youtubeUrl = getSetting(
    settings,
    "youtubechannelurl",
    fallbackSettings.youtubechannelurl
  );

  const playStoreUrl = getSetting(
    settings,
    "googleplayurl",
    fallbackSettings.googleplayurl
  );

  const appStoreUrl = getSetting(
    settings,
    "appstoreurl",
    fallbackSettings.appstoreurl
  );

  const phone = getSetting(settings, "mainphone", fallbackSettings.mainphone);
  const email = getSetting(settings, "mainemail", fallbackSettings.mainemail);
  const address = getSetting(
    settings,
    "officeaddress",
    fallbackSettings.officeaddress
  );

  return (
    <footer className="mt-20 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
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
              videos, Shorts, app access and digital media opportunities together for
              today’s Telugu-speaking audience.
            </p>

            <div className="mt-6 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "var(--gold)" }}
                />
                <span>{phone}</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "var(--gold)" }}
                />
                <span className="wrap-break-word">{email}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "var(--gold)" }}
                />
                <span className="leading-6">{address}</span>
              </div>
            </div>
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
            <h3 className="text-lg font-semibold">Digital Access</h3>
            <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Video className="h-4 w-4" style={{ color: "var(--gold)" }} />
                YouTube Channel
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4" style={{ color: "var(--gold)" }} />
                Google Play
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Apple className="h-4 w-4" style={{ color: "var(--gold)" }} />
                App Store
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Link href="/advertise">Advertise with us</Link>
              <Link href="/contact">Contact team</Link>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div>© {new Date().getFullYear()} Metro TV Telugu. All rights reserved.</div>
          <div>News • Videos • Shorts • App • Advertising</div>
        </div>
      </div>
    </footer>
  );
}