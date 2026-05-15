import {
  Tv,
  Radio,
  MonitorSmartphone,
  Newspaper,
  Users,
  Megaphone,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const highlights = [
  {
    icon: Newspaper,
    title: "Regional News",
    desc: "Coverage across public issues, local developments, civic updates and stories that matter to Telugu-speaking audiences.",
  },
  {
    icon: Radio,
    title: "Shows & Discussions",
    desc: "A platform for conversations, interviews, debates, special features and public-interest programming.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital-First Reach",
    desc: "A modern web and video experience that makes Metro TV Telugu easier to discover across devices.",
  },
  {
    icon: Megaphone,
    title: "Advertiser Opportunities",
    desc: "Visibility options for brands, local businesses, agencies, institutions and campaign partners.",
  },
];

export const metadata = {
  title: "About Metro TV Telugu",
  description:
    "Learn about Metro TV Telugu, its regional media presence, digital direction, news coverage, shows and advertiser opportunities.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">About Metro TV Telugu</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  A regional media platform built around news, stories and people
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Metro TV Telugu brings news, public-interest stories, discussions,
                  shows and video-led content to Telugu-speaking audiences through a
                  modern digital presence.
                </p>
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
                  From broadcast presence to a stronger digital identity
                </h2>

                <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                  Today, audiences discover news and stories through television,
                  YouTube, social platforms, websites and mobile-first browsing.
                  Metro TV Telugu’s digital presence is designed to bring these touchpoints
                  together into a cleaner, more credible and easier-to-navigate experience.
                </p>

                <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                  The website gives viewers a better way to explore videos, news updates,
                  programs, discussions and important stories while also creating a stronger
                  presentation layer for partners, advertisers and sponsors.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid gap-5">
                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">Our Focus</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To present regional stories, public issues, community voices,
                    video discussions and useful information in a format that is simple,
                    accessible and relevant for today’s audience.
                  </p>
                </div>

                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">Our Digital Direction</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To make Metro TV Telugu more discoverable across mobile, search,
                    social media and video platforms while keeping the trust and familiarity
                    of a regional media brand.
                  </p>
                </div>

                <div className="glass rounded-3xl p-6">
                  <h3 className="text-xl font-bold">For Partners & Advertisers</h3>
                  <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                    To support campaign visibility, sponsored stories, video promotions,
                    event coverage and local business communication through trusted media
                    presence.
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
              title="News, video, community and digital visibility"
              desc="The website is structured to support both audience engagement and business growth."
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
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <Users className="mx-auto h-10 w-10" style={{ color: "var(--gold)" }} />

              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                Built for Telugu audiences, businesses and public conversations
              </h2>

              <p
                className="mx-auto mt-5 max-w-3xl leading-8"
                style={{ color: "var(--muted)" }}
              >
                Metro TV Telugu’s new digital presence can become a destination for
                viewers, a platform for stories, and a trusted media channel for brands
                and institutions that want meaningful regional visibility.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}