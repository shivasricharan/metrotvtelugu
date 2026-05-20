import Link from "next/link";
import Image from "next/image";
import {
  Tv,
  Radio,
  MonitorSmartphone,
  Megaphone,
  Play,
  CircleDot,
  Newspaper,
  Users,
  Download,
  ExternalLink,
  Wifi,
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionTitle from "../components/SectionTitle";
import VideoCard from "../components/VideoCard";
import NewsCard from "../components/NewsCard";
import { fallbackTickerItems } from "../lib/tickerData";
import { getMetroCmsData } from "../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackAppLinks = {
  playStore: "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appStore: "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
  youtube: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
};

const featuredVideos = [
  { title: "Prime Time Bulletin",        category: "News",          videoId: "KlyvXNZWDZk" },
  { title: "Weekend Special Discussion", category: "Debate",        videoId: "92DsruOUAD0" },
  { title: "Cinema and Culture Focus",   category: "Entertainment", videoId: "1Ch2vJ1qmzM" },
];

const featuredNews = [
  {
    category: "Top Story",
    title: "Regional stories, public issues and people-first reporting",
    excerpt: "Stories that matter to Telugu-speaking audiences across society, governance, business and culture.",
  },
  {
    category: "Digital",
    title: "A modern video-first platform for today's audience",
    excerpt: "The website brings videos, shows, updates and editorial sections into a cleaner and more accessible digital experience.",
  },
  {
    category: "Advertisers",
    title: "Better visibility for brands, businesses and campaigns",
    excerpt: "The platform creates stronger opportunities for advertisers through sponsored content, video visibility and business enquiry flows.",
  },
];

const strengths = [
  { icon: Tv,                title: "Broadcast credibility",   desc: "A digital presence that reflects the trust, familiarity and recognition of a Telugu news channel." },
  { icon: Newspaper,         title: "News-led structure",       desc: "Clean sections for updates, stories, categories, shows and featured editorial content." },
  { icon: MonitorSmartphone, title: "Mobile-first experience",  desc: "Designed for viewers who discover and consume news mostly through mobile and social platforms." },
  { icon: Megaphone,         title: "Advertiser-ready pages",   desc: "Clear pathways for brands, agencies and local businesses to explore partnership opportunities." },
];

const businessBlocks = [
  { title: "Sponsored Stories",        desc: "Native editorial-style visibility for brands, public campaigns, institutions and local businesses." },
  { title: "Video Promotions",         desc: "Featured video slots, YouTube-led campaign visibility and digital-first content amplification." },
  { title: "Local Business Campaigns", desc: "Campaign pages and enquiry flows for real estate, education, health, retail and service businesses." },
  { title: "Event Coverage",           desc: "Digital presentation for launches, public programs, interviews, community events and special features." },
];

export default async function HomePage() {
  const cmsData = await getMetroCmsData("all");
  const settings = cmsData?.settings || {};

  const cmsTickerItems = Array.isArray(cmsData?.ticker)
    ? cmsData.ticker.map((item) => item.text).filter(Boolean)
    : [];

  const tickerItems = cmsTickerItems.length > 0 ? cmsTickerItems : fallbackTickerItems;

  const appLinks = {
    playStore: settings.googleplayurl     || fallbackAppLinks.playStore,
    appStore:  settings.appstoreurl       || fallbackAppLinks.appStore,
    youtube:   settings.youtubechannelurl || fallbackAppLinks.youtube,
  };

  const homepageFeaturedVideoId = settings.homepagefeaturedvideoid || "qw1c13nI-AM";

  return (
    <>
      {/* ── TICKER ─────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(232,0,29,0.20)" }}>
        <div className="container py-3">
          <div className="ticker rounded-full px-4 py-2 text-sm">
            <div className="ticker-track">
              {tickerItems.map((item, index) => (
                <span key={index} className="mr-10 inline-flex items-center gap-2">
                  {index === 0 ? (
                    <><CircleDot className="h-3 w-3" style={{ color: "#fff" }} />{item}</>
                  ) : item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <div className="hero-panel rounded-3xl p-6 md:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

              {/* LEFT */}
              <FadeIn>
                <div>
                  {/* Live on-air bar */}
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black tracking-widest text-white"
                      style={{ background: "var(--red)", letterSpacing: "0.18em" }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full bg-white"
                        style={{ animation: "pulse 1.4s infinite" }}
                      />
                      LIVE
                    </span>
                    <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                      On Air — Jio TV Box &amp; YouTube
                    </span>
                  </div>

                  <h1
                    className="text-4xl font-black leading-tight md:text-6xl"
                    style={{ lineHeight: 1.1 }}
                  >
                    Telugu News,{" "}
                    <span style={{ color: "var(--red)" }}>Stories</span>
                    <br />
                    &amp; Live Coverage
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-7" style={{ color: "var(--muted)" }}>
                    Regional news, public-interest reporting, programs and live coverage for
                    Telugu-speaking audiences across Telangana and Andhra Pradesh.
                  </p>

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
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="plat-badge">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#60a5fa" }} />
                      Jio TV Box
                    </span>
                    <span className="plat-badge">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#ff4444" }} />
                      YouTube Live
                    </span>
                    <span className="plat-badge">
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#4ade80" }} />
                      Android &amp; iOS App
                    </span>
                  </div>

                  {/* Stat pills */}
                  <div className="mt-10 grid gap-3 md:grid-cols-3">
                    {[
                      { label: "Regional updates",       value: "News"  },
                      { label: "Programs & discussions", value: "Shows" },
                      { label: "Long videos & Shorts",   value: "Video" },
                    ].map((s) => (
                      <div key={s.value} className="stat-pill">
                        <div className="text-2xl font-black" style={{ color: "var(--text)" }}>{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* RIGHT — featured video card */}
              <FadeIn delay={0.12}>
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-red)",
                    boxShadow: "0 0 40px rgba(232,0,29,0.10)",
                  }}
                >
                  {/* Card header with logo */}
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <Image
                      src="/metrotvlogo.png"
                      alt="Metro TV Telugu"
                      width={110}
                      height={62}
                      priority
                      className="rounded-lg"
                    />
                    <div
                      className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
                      style={{ background: "var(--red)", letterSpacing: "0.16em" }}
                    >
                      <Wifi className="h-3 w-3" />
                      FEATURED
                    </div>
                  </div>

                  {/* Video embed */}
                  <div className="p-4">
                    <div className="embed-wrap">
                      <iframe
                        src={`https://www.youtube.com/embed/${homepageFeaturedVideoId}`}
                        title="Featured Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Mini info strip */}
                  <div
                    className="grid grid-cols-2 divide-x px-5 pb-5"
                    style={{ borderTop: "1px solid var(--border)", color: "var(--border)" }}
                  >
                    {[
                      { heading: "Video-led discovery", sub: "News, debates, Shorts in one place" },
                      { heading: "App + YouTube reach",  sub: "Watch on mobile, TV or web"        },
                    ].map((item) => (
                      <div key={item.heading} className="px-4 pt-4" style={{ borderColor: "var(--border)" }}>
                        <div className="text-xs font-bold" style={{ color: "var(--text)" }}>{item.heading}</div>
                        <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHY METRO TV ───────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="A modern media platform"
              title="Built for viewers, stories and business growth"
              desc="The website is structured to support audience engagement, video discovery, editorial sections and advertiser conversations."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-4">
            {strengths.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div
                    className="card-hover rounded-2xl p-6"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FEATURED VIDEOS ────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Featured Videos"
              title="Watch latest stories, bulletins and discussions"
              desc="Selected videos highlighted to make the website feel current, active and video-first."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredVideos.map((video, index) => (
              <FadeIn key={video.title} delay={index * 0.08}>
                <VideoCard
                  title={video.title}
                  category={video.category}
                  videoId={video.videoId}
                />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/videos" className="btn-secondary">
              View all videos
            </Link>
            <a href={appLinks.youtube} target="_blank" rel="noreferrer" className="btn-secondary">
              YouTube Channel
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MOBILE APP ─────────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="badge-pill mb-5">Official Mobile App</div>
                  <h2 className="text-3xl font-black leading-tight md:text-5xl">
                    Watch anytime<br />on mobile
                  </h2>
                  <p className="mt-5 max-w-lg leading-7" style={{ color: "var(--muted)" }}>
                    Stay connected with live streaming, latest news videos, shows, Shorts
                    and updates through the official mobile app and YouTube channel.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={appLinks.playStore} target="_blank" rel="noreferrer" className="btn-primary">
                      <Download className="h-4 w-4" />
                      Google Play
                    </a>
                    <a href={appLinks.appStore} target="_blank" rel="noreferrer" className="btn-secondary">
                      App Store
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a href={appLinks.youtube} target="_blank" rel="noreferrer" className="btn-secondary">
                      YouTube
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { icon: MonitorSmartphone, title: "Live & on-demand",    desc: "Viewers can follow updates through app-based access, videos and digital-first content." },
                    { icon: Play,              title: "Long videos & Shorts", desc: "Regular YouTube uploads alongside mobile-style Shorts for faster discovery." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl p-5"
                        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                      >
                        <div
                          className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ background: "rgba(232,0,29,0.10)" }}
                        >
                          <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                        </div>
                        <h3 className="text-sm font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── NEWS & EDITORIAL ───────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="News & Editorial"
              title="A cleaner way to present news and stories"
              desc="Top stories, regional updates, entertainment, public-interest coverage, interviews and category-led browsing."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredNews.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <NewsCard
                  category={item.category}
                  title={item.title}
                  excerpt={item.excerpt}
                />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/news" className="btn-secondary">
              Explore news
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ADVERTISE ──────────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="adv-banner p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="badge-pill mb-5">Advertise with Metro TV</div>
                  <h2 className="text-3xl font-black leading-tight md:text-5xl">
                    Reach audiences through<br />
                    <span style={{ color: "var(--red)" }}>trusted regional media</span>
                  </h2>
                  <p className="mt-5 max-w-lg leading-7" style={{ color: "var(--muted)" }}>
                    Support advertisers, agencies, institutions and local businesses through
                    video visibility, sponsored stories, campaign pages and digital media partnerships.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/advertise" className="btn-primary">
                      Explore advertising
                    </Link>
                    <Link href="/contact" className="btn-secondary">
                      Contact team
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {businessBlocks.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl p-5"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <h3 className="text-sm font-bold" style={{ color: "var(--red)" }}>{item.title}</h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── BOTTOM 3 CARDS ─────────────────────────────────────────────── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { icon: Radio,     title: "Shows & Discussions", desc: "Dedicated pages for programs, interviews, debates, special features and audience-focused content." },
                { icon: Users,     title: "Community Stories",   desc: "Space for regional voices, local stories, public issues and people-led coverage across Telugu communities." },
                { icon: Megaphone, title: "Business Enquiries",  desc: "Clear contact paths for brands, sponsors, advertisers and strategic media partners." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="card-hover rounded-2xl p-7"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* pulse animation for LIVE dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </>
  );
}