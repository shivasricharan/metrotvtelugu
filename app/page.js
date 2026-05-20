import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Download,
  ExternalLink,
  CircleDot,
  Wifi,
  Newspaper,
  Radio,
  Film,
  Briefcase,
  Leaf,
  Megaphone,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import VideoCard from "../components/VideoCard";
import { fallbackTickerItems } from "../lib/tickerData";
import { getMetroCmsData } from "../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackAppLinks = {
  playStore: "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appStore:  "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
  youtube:   "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
};

const featuredVideos = [
  { title: "Prime Time Bulletin: Top stories of the day",               category: "News",          videoId: "KlyvXNZWDZk" },
  { title: "Weekend Special Discussion: Key political talking points",   category: "Debate",        videoId: "92DsruOUAD0" },
  { title: "Cinema and Culture Focus: Telugu film world updates",        category: "Entertainment", videoId: "1Ch2vJ1qmzM" },
];

const fallbackNews = [
  {
    category: "Telangana",
    title: "తెలంగాణ బడ్జెట్‌లో వ్యవసాయ రంగానికి భారీ కేటాయింపులు — రైతులకు శుభవార్త",
    time: "2 hours ago",
    size: "main",
  },
  {
    category: "Andhra Pradesh",
    title: "CM reviews key infrastructure projects across the state",
    time: "4 hours ago",
    size: "side",
  },
  {
    category: "National",
    title: "Parliament monsoon session schedule announced for July",
    time: "6 hours ago",
    size: "side",
  },
];

const shows = [
  { icon: Newspaper, name: "News & Views",   time: "8:00 PM Daily",  color: "#e8001d", bg: "rgba(232,0,29,0.10)"    },
  { icon: Briefcase, name: "Business Hour",  time: "7:00 PM Daily",  color: "#60a5fa", bg: "rgba(96,165,250,0.10)"  },
  { icon: Film,      name: "Cinema Focus",   time: "9:00 PM Daily",  color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  { icon: Leaf,      name: "Krishi Vaarta",  time: "6:00 AM Daily",  color: "#4ade80", bg: "rgba(74,222,128,0.10)"  },
];

const platforms = [
  { label: "Jio TV Box",     dot: "#60a5fa" },
  { label: "YouTube Live",   dot: "#ff4444" },
  { label: "Android & iOS",  dot: "#4ade80" },
];

/* ─── small reusable pieces ──────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <div
      className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em]"
      style={{ color: "var(--red)" }}
    >
      <span
        style={{
          display: "block",
          width: "3px",
          height: "14px",
          background: "var(--red)",
          borderRadius: "2px",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

function SectionHeader({ label, linkHref, linkLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <SectionLabel>{label}</SectionLabel>
      {linkHref && (
        <Link
          href={linkHref}
          className="text-xs transition hover:opacity-80"
          style={{ color: "var(--muted)" }}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */

export default async function HomePage() {
  const cmsData  = await getMetroCmsData("all");
  const settings = cmsData?.settings || {};

  const cmsTickerItems = Array.isArray(cmsData?.ticker)
    ? cmsData.ticker.map((i) => i.text).filter(Boolean)
    : [];
  const tickerItems = cmsTickerItems.length > 0 ? cmsTickerItems : fallbackTickerItems;

  const appLinks = {
    playStore: settings.googleplayurl     || fallbackAppLinks.playStore,
    appStore:  settings.appstoreurl       || fallbackAppLinks.appStore,
    youtube:   settings.youtubechannelurl || fallbackAppLinks.youtube,
  };

  const cmsVideos = Array.isArray(cmsData?.videos)
    ? cmsData.videos
        .map((v) => ({
          title:    v.title    || "Video Update",
          category: v.category || "Video",
          videoId:  v.youTubeID || v.youtubeId || v.videoId || "",
        }))
        .filter((v) => v.videoId)
        .slice(0, 3)
    : [];

  const videos = cmsVideos.length > 0 ? cmsVideos : featuredVideos;

  const homepageFeaturedVideoId =
    settings.homepagefeaturedvideoid || "qw1c13nI-AM";

  return (
    <>
      {/* ── TICKER ─────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(232,0,29,0.15)" }}>
        <div className="container py-2">
          <div
            className="ticker rounded-full px-4 py-2 text-sm"
            style={{ borderColor: "rgba(232,0,29,0.25) !important" }}
          >
            <div className="ticker-track">
              {tickerItems.map((item, i) => (
                <span key={i} className="mr-10 inline-flex items-center gap-2">
                  {i === 0
                    ? <><CircleDot className="h-3 w-3" style={{ color: "#fff" }} />{item}</>
                    : item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO — full split ───────────────────────────────────── */}
      <section>
        <div className="container">
          <div
            className="grid lg:grid-cols-2 overflow-hidden"
            style={{
              borderBottom: "1px solid var(--border)",
              minHeight: "420px",
            }}
          >
            {/* LEFT */}
            <FadeIn>
              <div
                className="flex flex-col justify-center py-12 pr-0 lg:pr-12"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,0,29,0.10) 0%, transparent 55%)",
                  borderRight: "1px solid var(--border)",
                }}
              >
                {/* Live pill */}
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white"
                    style={{ background: "var(--red)", letterSpacing: "0.18em" }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-white"
                      style={{ animation: "livepulse 1.4s infinite" }}
                    />
                    LIVE
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                    On Air — Jio TV Box &amp; YouTube
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="font-black leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08 }}
                >
                  Telugu News,{" "}
                  <span style={{ color: "var(--red)" }}>Stories</span>
                  <br />&amp; Live Coverage
                </h1>

                <p
                  className="mt-5 max-w-md text-sm leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  Regional news, public-interest reporting, programs and live coverage
                  for Telugu-speaking audiences across Telangana and Andhra Pradesh.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={appLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <Play className="h-4 w-4" />
                    Watch Live
                  </a>
                  <a
                    href={appLinks.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <Download className="h-4 w-4" />
                    Download App
                  </a>
                  <Link href="/videos" className="btn-secondary">
                    All Videos
                  </Link>
                </div>

                {/* Platform badges */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <span
                      key={p.label}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--muted-light)",
                      }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: p.dot, flexShrink: 0 }}
                      />
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* RIGHT — featured video */}
            <FadeIn delay={0.1}>
              <div
                className="flex flex-col"
                style={{ background: "var(--bg-card)" }}
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <Image
                    src="/metrotvlogo.png"
                    alt="Metro TV Telugu"
                    width={90}
                    height={50}
                    priority
                    className="rounded-lg"
                  />
                  <span
                    className="inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-black text-white"
                    style={{ background: "var(--red)", letterSpacing: "0.14em" }}
                  >
                    <Wifi className="h-3 w-3" />
                    FEATURED
                  </span>
                </div>

                {/* Embed */}
                <div className="flex-1 p-4">
                  <div className="embed-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${homepageFeaturedVideoId}`}
                      title="Featured Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Meta strip */}
                <div
                  className="grid grid-cols-2 divide-x px-4 pb-4"
                  style={{ borderTop: "1px solid var(--border)", borderColor: "var(--border)" }}
                >
                  {[
                    { h: "Video-led discovery",  s: "News, debates &amp; Shorts" },
                    { h: "App + YouTube reach",   s: "Watch on mobile, TV or web" },
                  ].map((item) => (
                    <div
                      key={item.h}
                      className="px-3 pt-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="text-xs font-bold" style={{ color: "var(--text)" }}>
                        {item.h}
                      </div>
                      <div
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--muted)" }}
                        dangerouslySetInnerHTML={{ __html: item.s }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── NEWS SECTION ───────────────────────────────────────── */}
      <section className="section-space" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader label="Latest News" linkHref="/news" linkLabel="View all" />
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="grid gap-3 md:grid-cols-3">

              {/* Main story */}
              <div
                className="md:col-span-1 rounded-xl overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  gridRow: "span 2",
                }}
              >
                <div
                  className="flex items-end p-4"
                  style={{
                    height: "140px",
                    background: "linear-gradient(135deg, #1a0505, #2d0808)",
                  }}
                >
                  <span
                    className="rounded px-2 py-1 text-xs font-black text-white uppercase tracking-wider"
                    style={{ background: "var(--red)" }}
                  >
                    {fallbackNews[0].category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold leading-6" style={{ color: "var(--text)" }}>
                    {fallbackNews[0].title}
                  </p>
                  <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                    {fallbackNews[0].time} · Metro TV Telugu
                  </p>
                </div>
              </div>

              {/* Side stories */}
              {fallbackNews.slice(1).map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl overflow-hidden flex gap-0"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="w-24 shrink-0 flex items-end p-3"
                    style={{
                      background:
                        item.category === "Andhra Pradesh"
                          ? "linear-gradient(135deg,#051a10,#0a2818)"
                          : "linear-gradient(135deg,#050d1a,#0a1530)",
                    }}
                  >
                    <span
                      className="rounded px-1.5 py-0.5 text-white uppercase tracking-wide"
                      style={{ background: "var(--red)", fontSize: "7px", fontWeight: 900 }}
                    >
                      {item.category === "Andhra Pradesh" ? "AP" : "National"}
                    </span>
                  </div>
                  <div className="p-3 flex flex-col justify-center">
                    <p
                      className="text-xs font-black uppercase tracking-widest mb-1"
                      style={{ color: "var(--red)" }}
                    >
                      {item.category}
                    </p>
                    <p className="text-sm font-semibold leading-5" style={{ color: "var(--text)" }}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── VIDEOS ─────────────────────────────────────────────── */}
      <section className="section-space" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader label="Latest Videos" linkHref="/videos" linkLabel="YouTube Channel" />
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {videos.map((video, i) => (
              <FadeIn key={`${video.videoId}-${i}`} delay={i * 0.08}>
                <VideoCard
                  title={video.title}
                  category={video.category}
                  videoId={video.videoId}
                />
              </FadeIn>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/videos" className="btn-secondary">View all videos</Link>
            <a
              href={appLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              YouTube Channel <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SHOWS SCHEDULE ─────────────────────────────────────── */}
      <section className="section-space" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader label="Programs & Shows" linkHref="/shows" linkLabel="All shows" />
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              {shows.map((show) => {
                const Icon = show.icon;
                return (
                  <Link
                    key={show.name}
                    href="/shows"
                    className="card-hover rounded-xl p-4 flex flex-col gap-3"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: show.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: show.color }} />
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: "var(--text)" }}
                      >
                        {show.name}
                      </div>
                      <div
                        className="mt-1 text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        {show.time}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── APP SECTION ────────────────────────────────────────── */}
      <section className="section-space" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <FadeIn>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <SectionLabel>Official Mobile App</SectionLabel>
                  <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                    Watch anytime<br />on mobile
                  </h2>
                  <p
                    className="mt-4 text-sm leading-7"
                    style={{ color: "var(--muted)" }}
                  >
                    Live streaming, latest news videos, shows, Shorts and updates
                    through the official mobile app and YouTube channel.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={appLinks.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      <Download className="h-4 w-4" />
                      Google Play
                    </a>
                    <a
                      href={appLinks.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      App Store
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={appLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      YouTube
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="mx-auto mb-2 h-3 w-3 rounded-full"
                        style={{ background: p.dot }}
                      />
                      <div
                        className="text-xs font-semibold leading-5"
                        style={{ color: "var(--text)" }}
                      >
                        {p.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ADVERTISE BANNER ───────────────────────────────────── */}
      <section className="section-space" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <FadeIn>
            <div
              className="adv-banner rounded-2xl p-6 md:p-10"
            >
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: "rgba(232,0,29,0.12)" }}
                  >
                    <Megaphone className="h-6 w-6" style={{ color: "var(--red)" }} />
                  </div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    Reach Telugu audiences through{" "}
                    <span style={{ color: "var(--red)" }}>trusted regional media</span>
                  </h2>
                </div>
                <div>
                  <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
                    Sponsored stories, video promotions, event coverage and local business
                    campaigns — Metro TV Telugu is a powerful platform for brands that
                    want regional attention.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/advertise" className="btn-primary">
                      Explore advertising
                    </Link>
                    <Link href="/contact" className="btn-secondary">
                      Contact team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes livepulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}