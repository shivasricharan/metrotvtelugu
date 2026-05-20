import Link from "next/link";
import {
  Tv, Radio, MonitorSmartphone, Newspaper, Users, Megaphone,
  PlayCircle, Smartphone, Briefcase, HeartPulse, GraduationCap,
  Building2, Leaf, Sparkles, ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackLinks = {
  youtube:    "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
  playStore:  "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appStore:   "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
};

const highlights = [
  { icon: Radio,        title: "Shows & Programs",   desc: "A platform for conversations, interviews, programs, public-interest features and subject-led coverage areas." },
  { icon: PlayCircle,   title: "Videos & Shorts",    desc: "Long-format YouTube videos and short-format updates presented in a cleaner digital experience." },
  { icon: MonitorSmartphone, title: "App & Digital Access", desc: "The channel can be discovered through the website, mobile app, YouTube and digital-first viewing habits." },
  { icon: Megaphone,    title: "Advertiser Ready",   desc: "Clear pathways for brands, agencies and local businesses to explore partnership and campaign opportunities." },
];

const coverageAreas = [
  { icon: Briefcase,      title: "Business & Industry",       desc: "Service sector, manufacturing, finance, banking, insurance, trade, investments and local business stories." },
  { icon: HeartPulse,     title: "Health & Lifestyle",        desc: "Health, beauty, wellness, yoga, meditation, hospitals, lifestyle and family-focused programming." },
  { icon: GraduationCap, title: "Education & Career",        desc: "Education, training, youth, career guidance, skills and opportunities for students and professionals." },
  { icon: Building2,      title: "Civic & Community",         desc: "Cities, municipalities, colonies, public issues, transport, local communities and people-led concerns." },
  { icon: Leaf,           title: "Agriculture & Environment", desc: "Agriculture, agro industries, renewable energy, sustainability and environment-focused stories." },
  { icon: Sparkles,       title: "Entertainment & Culture",   desc: "Cinema, cultural activities, sports, fitness, religious activities, astrology and public celebrations." },
];

const focusCards = [
  { title: "Our Focus",            body: "To present regional stories, public issues, community voices, video discussions and useful information in a format that is simple, accessible and relevant for today's Telugu audience." },
  { title: "Our Digital Direction",body: "To make the platform more discoverable across mobile, YouTube, search, social media and digital channels while keeping the familiarity of a regional media brand." },
  { title: "For Partners & Advertisers", body: "To support campaign visibility, sponsored stories, video promotions, event coverage and local business communication through trusted regional media presence." },
];

export const metadata = {
  title: "About Metro TV Telugu",
  description: "Learn about Metro TV Telugu, its regional media presence, news coverage, programs, YouTube videos, app access, digital direction and advertiser opportunities.",
};

function getSetting(settings, key, fallback) {
  return settings?.[key] || fallback;
}

export default async function AboutPage() {
  const settings    = (await getMetroCmsData("settings")) || {};
  const youtubeUrl  = getSetting(settings, "youtubechannelurl", fallbackLinks.youtube);
  const playStoreUrl= getSetting(settings, "googleplayurl",     fallbackLinks.playStore);
  const appStoreUrl = getSetting(settings, "appstoreurl",       fallbackLinks.appStore);

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill mb-6">About Metro TV Telugu</div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl" style={{ lineHeight: 1.1 }}>
                  A Telugu Media Platform for<br />
                  <span style={{ color: "var(--red)" }}>News, Videos &amp; Programs</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Metro TV Telugu brings together regional news, public-interest stories,
                  programs, video coverage, digital updates and community-focused
                  conversations for Telugu-speaking audiences.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/videos" className="btn-primary">
                    <PlayCircle className="h-4 w-4" /> Watch videos
                  </Link>
                  <a href={youtubeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                    YouTube Channel <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TV TO DIGITAL ── */}
      <section className="section-space">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-red)" }}
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(232,0,29,0.10)" }}
                >
                  <Tv className="h-6 w-6" style={{ color: "var(--red)" }} />
                </div>
                <h2 className="text-3xl font-black leading-tight md:text-4xl">
                  From television to a stronger digital media identity
                </h2>
                <p className="mt-5 leading-7" style={{ color: "var(--muted)" }}>
                  Audiences now discover news and stories through television, YouTube,
                  mobile apps, social platforms, search and websites. The new digital
                  presence brings these touchpoints together into a cleaner, more
                  credible and easier-to-navigate experience.
                </p>
                <p className="mt-4 leading-7" style={{ color: "var(--muted)" }}>
                  The website gives viewers a better way to explore videos, Shorts,
                  programs and discussions while creating stronger presentation for
                  advertisers, sponsors and media partners.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid gap-4">
                {focusCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <h3 className="font-bold" style={{ color: "var(--red)" }}>{card.title}</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>{card.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── HIGHLIGHTS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="What the platform brings together"
              title="Videos, programs, app access and regional visibility"
              desc="Structured to support viewers, communities, businesses, advertisers and public conversations."
              center={true}
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div
                    className="card-hover rounded-2xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── COVERAGE AREAS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Coverage Areas"
              title="Stories across public life, business, culture and communities"
              desc="The channel covers a broad set of content verticals relevant to Telugu-speaking audiences and regional businesses."
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {coverageAreas.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div
                    className="card-hover rounded-2xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WATCH SECTION ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: "rgba(232,0,29,0.10)" }}
                  >
                    <Smartphone className="h-6 w-6" style={{ color: "var(--red)" }} />
                  </div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    Watch across web, YouTube and mobile apps
                  </h2>
                  <p className="mt-5 leading-7" style={{ color: "var(--muted)" }}>
                    Viewers can follow the channel through the website, YouTube and
                    official mobile apps — accessible for long videos, short updates,
                    mobile viewing and on-demand discovery.
                  </p>
                </div>
                <div className="grid gap-3">
                  {[
                    { href: playStoreUrl, label: "Download on Google Play", sub: "Android App" },
                    { href: appStoreUrl,  label: "Download on App Store",   sub: "iOS App"     },
                    { href: youtubeUrl,   label: "Watch videos and Shorts",  sub: "YouTube"     },
                  ].map((item) => (
                    <a
                      key={item.sub}
                      href={item.href} target="_blank" rel="noreferrer"
                      className="card-hover flex items-center justify-between rounded-2xl p-5"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--red)" }}>
                          {item.sub}
                        </div>
                        <h3 className="mt-1 font-bold">{item.label}</h3>
                      </div>
                      <ExternalLink className="h-4 w-4" style={{ color: "var(--muted)" }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── BOTTOM CTA ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="adv-banner rounded-3xl p-8 text-center md:p-12">
              <div
                className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(232,0,29,0.12)" }}
              >
                <Users className="h-6 w-6" style={{ color: "var(--red)" }} />
              </div>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                Built for Telugu audiences, businesses and public conversations
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7" style={{ color: "var(--muted)" }}>
                This digital presence can become a destination for viewers, a platform for
                stories and a media channel for brands, institutions and local businesses
                that want meaningful regional visibility.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/advertise" className="btn-primary">
                  Explore advertising opportunities <Megaphone className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}