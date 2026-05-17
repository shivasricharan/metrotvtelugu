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
} from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionTitle from "../components/SectionTitle";
import VideoCard from "../components/VideoCard";
import NewsCard from "../components/NewsCard";
import { tickerItems } from "../lib/tickerData";

const appLinks = {
  playStore: "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appStore: "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
  youtube: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
};

const featuredVideos = [
  {
    title: "Metro Prime Time Bulletin",
    category: "News",
    videoId: "KlyvXNZWDZk",
  },
  {
    title: "Weekend Special Discussion",
    category: "Debate",
    videoId: "92DsruOUAD0",
  },
  {
    title: "Cinema and Culture Focus",
    category: "Entertainment",
    videoId: "1Ch2vJ1qmzM",
  },
];

const featuredNews = [
  {
    category: "Top Story",
    title: "Regional stories, public issues and people-first reporting",
    excerpt:
      "Metro TV Telugu focuses on stories that matter to Telugu-speaking audiences across news, society, governance, business and culture.",
  },
  {
    category: "Digital",
    title: "A modern video-first platform for today’s audience",
    excerpt:
      "The new website brings videos, shows, updates and editorial sections into a cleaner and more accessible digital experience.",
  },
  {
    category: "Advertisers",
    title: "Better visibility for brands, businesses and campaigns",
    excerpt:
      "The platform creates stronger opportunities for advertisers through sponsored content, video visibility and business enquiry flows.",
  },
];

const strengths = [
  {
    icon: Tv,
    title: "Broadcast credibility",
    desc: "A digital presence that reflects the trust, familiarity and recognition of a Telugu news channel.",
  },
  {
    icon: Newspaper,
    title: "News-led structure",
    desc: "Clean sections for updates, stories, categories, shows and featured editorial content.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile-first experience",
    desc: "Designed for viewers who discover and consume news mostly through mobile and social platforms.",
  },
  {
    icon: Megaphone,
    title: "Advertiser-ready pages",
    desc: "Clear pathways for brands, agencies and local businesses to explore partnership opportunities.",
  },
];

const businessBlocks = [
  {
    title: "Sponsored Stories",
    desc: "Native editorial-style visibility for brands, public campaigns, institutions and local businesses.",
  },
  {
    title: "Video Promotions",
    desc: "Featured video slots, YouTube-led campaign visibility and digital-first content amplification.",
  },
  {
    title: "Local Business Campaigns",
    desc: "Campaign pages and enquiry flows for real estate, education, health, retail and service businesses.",
  },
  {
    title: "Event Coverage",
    desc: "Digital presentation for launches, public programs, interviews, community events and special features.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container py-3">
          <div className="glass rounded-full px-4 py-2 text-sm ticker">
            <div className="ticker-track">
              {tickerItems.map((item, index) => (
                <span key={index} className="mr-10 inline-flex items-center gap-2">
                  {index === 0 ? (
                    <>
                      <CircleDot className="h-4 w-4 text-red-500" />
                      {item}
                    </>
                  ) : (
                    item
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="hero-panel glass-strong rounded-3xl p-6 md:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <FadeIn>
                <div>
                  <div className="badge-pill">Metro TV Telugu Digital</div>

                  <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                    News, stories and videos for a changing Telugu audience
                  </h1>

                  <p
                    className="mt-6 max-w-xl text-lg leading-8"
                    style={{ color: "var(--muted)" }}
                  >
                    Metro TV Telugu brings regional news, public-interest coverage,
                    discussions, shows and digital-first video content together in one
                    modern destination for viewers, partners and advertisers.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/videos" className="btn-primary">
                      <Play className="h-4 w-4" />
                      Watch Videos
                    </Link>

                    <a
                      href={appLinks.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      <Download className="h-4 w-4" />
                      Download App
                    </a>
                  </div>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">News</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Regional updates
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">Shows</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Programs & discussions
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">Video</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Long videos & Shorts
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <div className="glass rounded-3xl p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <Image
                      src="/metrotvlogo.png"
                      alt="Metro TV Telugu logo"
                      width={170}
                      height={96}
                      priority
                      className="rounded-xl"
                    />

                    <div className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-300">
                      Featured
                    </div>
                  </div>

                  <div className="embed-wrap">
                    <iframe
                      src="https://www.youtube.com/embed/qw1c13nI-AM"
                      title="Metro TV Telugu Featured Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="glass rounded-2xl p-4">
                      <div className="text-sm font-semibold">Video-led discovery</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Featured stories, discussions, updates and Shorts in a cleaner format.
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-4">
                      <div className="text-sm font-semibold">App + YouTube reach</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Viewers can watch Metro TV Telugu through the website, app and YouTube.
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="A modern media platform"
              title="Built for viewers, stories and business growth"
              desc="The new Metro TV Telugu website is structured to support audience engagement, video discovery, editorial sections and advertiser conversations."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-4">
            {strengths.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Featured Videos"
              title="Watch latest stories, bulletins and discussions"
              desc="Selected Metro TV Telugu videos can be highlighted here to make the website feel current, active and video-first."
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

            <a
              href={appLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              YouTube Channel
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="badge-pill">Metro TV Telugu App</div>

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Watch Metro TV Telugu anytime on mobile
                  </h2>

                  <p className="mt-5 max-w-xl leading-8" style={{ color: "var(--muted)" }}>
                    Stay connected with live streaming, latest news videos, shows, Shorts
                    and updates from Metro TV Telugu through the official mobile app and
                    YouTube channel.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
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

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="glass rounded-3xl p-6">
                    <MonitorSmartphone
                      className="h-8 w-8"
                      style={{ color: "var(--gold)" }}
                    />
                    <h3 className="mt-4 text-lg font-semibold">Live & on-demand</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Viewers can follow Metro TV Telugu through app-based access, videos,
                      updates and digital-first content.
                    </p>
                  </div>

                  <div className="glass rounded-3xl p-6">
                    <Play className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-lg font-semibold">Long videos & Shorts</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      The videos section can showcase regular YouTube uploads along with
                      mobile-style Shorts for faster discovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="News & Editorial"
              title="A cleaner way to present news and stories"
              desc="The site can support top stories, regional updates, entertainment, public-interest coverage, interviews and category-led browsing."
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

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="badge-pill">Advertise with Metro TV</div>

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Reach audiences through trusted regional media
                  </h2>

                  <p
                    className="mt-5 max-w-xl leading-8"
                    style={{ color: "var(--muted)" }}
                  >
                    Metro TV Telugu can support advertisers, agencies, institutions and
                    local businesses through video visibility, sponsored stories,
                    campaign pages and digital media partnerships.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
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
                    <div key={item.title} className="glass rounded-3xl p-6">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
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

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="glass-strong rounded-3xl p-7">
                <Radio className="h-8 w-8" style={{ color: "var(--gold)" }} />
                <h3 className="mt-4 text-xl font-bold">Shows & Discussions</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Dedicated pages for programs, interviews, debates, special features and
                  audience-focused content.
                </p>
              </div>

              <div className="glass-strong rounded-3xl p-7">
                <Users className="h-8 w-8" style={{ color: "var(--gold)" }} />
                <h3 className="mt-4 text-xl font-bold">Community Stories</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Space for regional voices, local stories, public issues and people-led
                  coverage across Telugu communities.
                </p>
              </div>

              <div className="glass-strong rounded-3xl p-7">
                <Megaphone className="h-8 w-8" style={{ color: "var(--gold)" }} />
                <h3 className="mt-4 text-xl font-bold">Business Enquiries</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Clear contact paths for brands, sponsors, advertisers and strategic
                  media partners.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}