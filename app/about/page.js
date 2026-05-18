import Link from "next/link";
import {
  Tv,
  Radio,
  MonitorSmartphone,
  Newspaper,
  Users,
  Megaphone,
  PlayCircle,
  Smartphone,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Building2,
  Leaf,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackLinks = {
  youtube: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
  playStore: "https://play.google.com/store/apps/details?id=com.ht.metro_tv",
  appStore: "https://apps.apple.com/in/app/metro-tv-telugu/id6756271666",
};

const highlights = [
  {
    icon: Newspaper,
    title: "Regional News",
    desc: "Coverage across public issues, civic updates, regional developments and stories that matter to Telugu-speaking audiences.",
  },
  {
    icon: Radio,
    title: "Shows & Programs",
    desc: "A platform for conversations, interviews, programs, public-interest features and subject-led coverage areas.",
  },
  {
    icon: PlayCircle,
    title: "Videos & Shorts",
    desc: "Long-format YouTube videos and short-format updates presented in a cleaner digital experience.",
  },
  {
    icon: MonitorSmartphone,
    title: "App & Digital Access",
    desc: "Metro TV Telugu can be discovered through the website, mobile app, YouTube and digital-first viewing habits.",
  },
];

const coverageAreas = [
  {
    icon: Briefcase,
    title: "Business & Industry",
    desc: "Service sector, manufacturing, finance, banking, insurance, trade, investments and local business stories.",
  },
  {
    icon: HeartPulse,
    title: "Health & Lifestyle",
    desc: "Health, beauty, wellness, yoga, meditation, hospitals, lifestyle and family-focused programming.",
  },
  {
    icon: GraduationCap,
    title: "Education & Career",
    desc: "Education, training, youth, career guidance, skills and opportunities for students and professionals.",
  },
  {
    icon: Building2,
    title: "Civic & Community",
    desc: "Cities, municipalities, colonies, public issues, transport, local communities and people-led concerns.",
  },
  {
    icon: Leaf,
    title: "Agriculture & Environment",
    desc: "Agriculture, agro industries, renewable energy, sustainability and environment-focused stories.",
  },
  {
    icon: Sparkles,
    title: "Entertainment & Culture",
    desc: "Cinema, cultural activities, sports, fitness, religious activities, astrology and public celebrations.",
  },
];

export const metadata = {
  title: "About Metro TV Telugu",
  description:
    "Learn about Metro TV Telugu, its regional media presence, news coverage, programs, YouTube videos, app access, digital direction and advertiser opportunities.",
};

function getSetting(settings, key, fallback) {
  return settings?.[key] || fallback;
}

export default async function AboutPage() {
  const settings = (await getMetroCmsData("settings")) || {};

  const youtubeUrl = getSetting(
    settings,
    "youtubechannelurl",
    fallbackLinks.youtube
  );

  const playStoreUrl = getSetting(
    settings,
    "googleplayurl",
    fallbackLinks.playStore
  );

  const appStoreUrl = getSetting(
    settings,
    "appstoreurl",
    fallbackLinks.appStore
  );

  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">About Metro TV Telugu</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  A Telugu media platform for news, videos, programs and public
                  conversations
                </h1>

                <p
                  className="mt-6 text-lg leading-8"
                  style={{ color: "var(--muted)" }}
                >
                  Metro TV Telugu is a regional Telugu media platform bringing together
                  news, public-interest stories, programs, video coverage, digital updates
                  and community-focused conversations for Telugu-speaking audiences.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/videos" className="btn-primary">
                    <PlayCircle className="h-4 w-4" />
                    Watch videos
                  </Link>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    YouTube Channel
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="glass-strong rounded-3xl p-8 md:p-10">
                <Tv className="h-10 w-10" style={{ color: "var(--gold)" }} />

                <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                  From television presence to a stronger digital media identity
                </h2>

                <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                  Audiences now discover news and stories through television, YouTube,
                  mobile apps, social platforms, search and websites. Metro TV Telugu’s
                  new digital presence brings these touchpoints together into a cleaner,
                  more credible and easier-to-navigate experience.
                </p>

                <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                  The website gives viewers a better way to explore videos, Shorts, news
                  updates, programs, discussions and important stories while also creating
                  stronger presentation for advertisers, sponsors and media partners.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid gap-5">
                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">Our Focus</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To present regional stories, public issues, community voices, video
                    discussions and useful information in a format that is simple,
                    accessible and relevant for today’s Telugu audience.
                  </p>
                </div>

                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">Our Digital Direction</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To make Metro TV Telugu more discoverable across mobile, YouTube,
                    search, social media and digital platforms while keeping the familiarity
                    of a regional media brand.
                  </p>
                </div>

                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">For Partners & Advertisers</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To support campaign visibility, sponsored stories, video promotions,
                    event coverage and local business communication through trusted
                    regional media presence.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="What Metro TV Telugu brings together"
              title="News, videos, programs, app access and regional visibility"
              desc="The platform is structured to support viewers, communities, businesses, advertisers and public conversations."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: "var(--muted)" }}
                    >
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
              eyebrow="Coverage Areas"
              title="Stories across public life, business, culture and communities"
              desc="Metro TV Telugu can cover a broad set of content verticals relevant to Telugu-speaking audiences and regional businesses."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {coverageAreas.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: "var(--muted)" }}
                    >
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
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <Smartphone className="h-10 w-10" style={{ color: "var(--gold)" }} />

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Watch Metro TV Telugu across web, YouTube and mobile apps
                  </h2>

                  <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                    Viewers can follow Metro TV Telugu through the website, YouTube channel
                    and official mobile apps. This makes the platform accessible for people
                    who prefer long videos, short updates, mobile viewing and on-demand
                    discovery.
                  </p>
                </div>

                <div className="grid gap-4">
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass card-hover rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div
                          className="text-xs font-bold uppercase tracking-[0.18em]"
                          style={{ color: "var(--gold)" }}
                        >
                          Android App
                        </div>
                        <h3 className="mt-2 text-xl font-bold">Download on Google Play</h3>
                      </div>
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>

                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass card-hover rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div
                          className="text-xs font-bold uppercase tracking-[0.18em]"
                          style={{ color: "var(--gold)" }}
                        >
                          iOS App
                        </div>
                        <h3 className="mt-2 text-xl font-bold">Download on App Store</h3>
                      </div>
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass card-hover rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div
                          className="text-xs font-bold uppercase tracking-[0.18em]"
                          style={{ color: "var(--gold)" }}
                        >
                          YouTube
                        </div>
                        <h3 className="mt-2 text-xl font-bold">Watch videos and Shorts</h3>
                      </div>
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 text-center md:p-12">
              <Users className="mx-auto h-10 w-10" style={{ color: "var(--gold)" }} />

              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                Built for Telugu audiences, businesses and public conversations
              </h2>

              <p
                className="mx-auto mt-5 max-w-3xl leading-8"
                style={{ color: "var(--muted)" }}
              >
                Metro TV Telugu’s digital presence can become a destination for viewers,
                a platform for stories and a media channel for brands, institutions and
                local businesses that want meaningful regional visibility.
              </p>

              <div className="mt-8 flex justify-center">
                <Link href="/advertise" className="btn-primary">
                  Explore advertising opportunities
                  <Megaphone className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}