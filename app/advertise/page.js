import Link from "next/link";
import { Megaphone, Video, Newspaper, Building2, CalendarDays, PhoneCall } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const opportunities = [
  {
    icon: Video,
    title: "Video Promotions",
    desc: "Promote campaigns through featured video slots, interviews, sponsored segments and YouTube-led visibility.",
  },
  {
    icon: Newspaper,
    title: "Sponsored Stories",
    desc: "Create brand stories, public announcements, launch coverage and editorial-style sponsored features.",
  },
  {
    icon: Building2,
    title: "Local Business Campaigns",
    desc: "Support real estate, education, healthcare, retail, political, public service and service-business campaigns.",
  },
  {
    icon: CalendarDays,
    title: "Event Coverage",
    desc: "Cover launches, community programs, press meets, interviews, celebrations and public-facing events.",
  },
];

export const metadata = {
  title: "Advertise with Metro TV Telugu",
  description:
    "Explore advertising, sponsored content, video promotions and campaign opportunities with Metro TV Telugu.",
};

export default function AdvertisePage() {
  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-3xl">
                <div className="badge-pill">Advertise with Metro TV</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Reach Telugu audiences through trusted regional media
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Metro TV Telugu offers advertising and partnership opportunities for
                  brands, agencies, local businesses, institutions, campaigns and event
                  organizers looking to reach a focused Telugu-speaking audience.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    <PhoneCall className="h-4 w-4" />
                    Enquire now
                  </Link>

                  <Link href="/videos" className="btn-secondary">
                    View video showcase
                  </Link>
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
              eyebrow="Advertising Opportunities"
              title="Visibility formats for modern campaigns"
              desc="The website can support multiple business opportunities across video, editorial, events, local campaigns and sponsored content."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-4">
            {opportunities.map((item, index) => {
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
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <Megaphone className="h-10 w-10" style={{ color: "var(--gold)" }} />
                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Build campaigns with TV credibility and digital reach
                  </h2>
                </div>

                <div>
                  <p className="leading-8" style={{ color: "var(--muted)" }}>
                    From sponsored stories and video promotions to event coverage and
                    local business visibility, Metro TV Telugu can become a powerful
                    platform for brands that want regional attention and trusted media
                    presence.
                  </p>

                  <div className="mt-8">
                    <Link href="/contact" className="btn-primary">
                      Contact advertising team
                    </Link>
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
