import Link from "next/link";
import Image from "next/image";
import { Tv, Radio, MonitorSmartphone, Megaphone, Play, CircleDot } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionTitle from "../components/SectionTitle";
import VideoCard from "../components/VideoCard";
import NewsCard from "../components/NewsCard";

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
    title: "A stronger digital presentation for Telugu audiences",
    excerpt:
      "This demo shows how Metro TV Telugu can look more current, more immersive and easier to explore.",
  },
  {
    category: "Entertainment",
    title: "Cleaner content architecture for news, shows and video",
    excerpt:
      "Instead of looking flat or text-heavy, the website can feel like a true media destination.",
  },
  {
    category: "Advertiser Value",
    title: "A more credible digital face for sponsors and partners",
    excerpt:
      "A premium web experience increases confidence among advertisers, agencies and strategic partners.",
  },
];

const strengths = [
  {
    icon: Tv,
    title: "Broadcast presence, digitally elevated",
    desc: "A look and feel that reflects television credibility with a modern web experience.",
  },
  {
    icon: Radio,
    title: "Content-first browsing",
    desc: "A cleaner structure for viewers to discover shows, clips and stories faster.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile-friendly experience",
    desc: "Designed to feel richer across phone, tablet and desktop screens.",
  },
  {
    icon: Megaphone,
    title: "Advertiser-ready positioning",
    desc: "Helps Metro TV present stronger value to brands and media buyers.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container py-3">
          <div className="glass rounded-full px-4 py-2 text-sm ticker">
            <div className="ticker-track">
              <span className="mr-10 inline-flex items-center gap-2">
                <CircleDot className="h-4 w-4 text-red-500" />
                LIVE STYLE DEMO EXPERIENCE
              </span>
              <span className="mr-10">Premium Metro TV Telugu digital presentation</span>
              <span className="mr-10">Video-first browsing and richer UI</span>
              <span className="mr-10">Designed for viewers, partners and advertisers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="hero-panel glass-strong rounded-3xl p-8 md:p-14">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <FadeIn>
                <div>
                  <div className="badge-pill">Premium Demo Prototype</div>

                  <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                    Metro TV Telugu
                    <br />
                    redesigned to feel live, modern and premium
                  </h1>

                  <p
                    className="mt-6 max-w-xl text-lg leading-8"
                    style={{ color: "var(--muted)" }}
                  >
                    This is a high-impact demo concept built to show how Metro TV Telugu can
                    look richer, feel more premium and present content in a way that better
                    serves viewers, partners and advertisers.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/videos" className="btn-primary">
                      <Play className="h-4 w-4" />
                      Explore Videos
                    </Link>

                    <Link href="/contact" className="btn-secondary">
                      Discuss Full Revamp
                    </Link>
                  </div>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">6</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Demo pages
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">V2</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Premium concept
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-5">
                      <div className="text-3xl font-extrabold">Live</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Broadcast feel
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
                      On Air Feel
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
                      <div className="text-sm font-semibold">Content Discovery</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Better story flow, show access and video-led sections.
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-4">
                      <div className="text-sm font-semibold">Advertiser Confidence</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        Stronger presentation for brand conversations and partnerships.
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
              eyebrow="What this demo communicates"
              title="Why this version feels more authentic"
              desc="The goal is not to build the full production platform today. The goal is to make the future website feel real enough to approve."
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
              title="A stronger video-first browsing experience"
              desc="Use selected real Metro TV Telugu YouTube IDs here so the demo feels authentic immediately."
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
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Editorial Experience"
              title="News and story blocks that feel more premium"
              desc="This helps Metro TV Telugu look like a more serious digital media property instead of a basic static website."
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
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <div className="badge-pill">Advertiser Potential</div>

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    A better site can support stronger ad conversations
                  </h2>

                  <p
                    className="mt-5 max-w-xl leading-8"
                    style={{ color: "var(--muted)" }}
                  >
                    This demo also signals future room for sponsored content, featured shows,
                    campaign pages, partner integrations and premium digital visibility.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="glass rounded-3xl p-6">
                    <h3 className="text-lg font-semibold">Sponsored Sections</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Branded stories, sponsored programming pages and digital visibility blocks.
                    </p>
                  </div>

                  <div className="glass rounded-3xl p-6">
                    <h3 className="text-lg font-semibold">Campaign Pages</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Future-ready structure for custom advertiser campaigns and integrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}