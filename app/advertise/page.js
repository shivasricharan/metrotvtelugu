import Link from "next/link";
import { Megaphone, Video, Newspaper, Building2, CalendarDays, PhoneCall } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const opportunities = [
  { icon: Video,        title: "Video Promotions",        desc: "Promote campaigns through featured video slots, interviews, sponsored segments and YouTube-led visibility." },
  { icon: Newspaper,    title: "Sponsored Stories",        desc: "Create brand stories, public announcements, launch coverage and editorial-style sponsored features." },
  { icon: Building2,    title: "Local Business Campaigns", desc: "Support real estate, education, healthcare, retail, political, public service and service-business campaigns." },
  { icon: CalendarDays, title: "Event Coverage",           desc: "Cover launches, community programs, press meets, interviews, celebrations and public-facing events." },
];

const reasons = [
  { stat: "Jio TV Box Ch.5033", label: "Live broadcast platform" },
  { stat: "YouTube",       label: "Digital video reach"     },
  { stat: "Android + iOS", label: "Official mobile app"     },
  { stat: "Hyderabad",     label: "Headquartered in TS"     },
];

export const metadata = {
  title: "Advertise with Metro TV Telugu",
  description: "Explore advertising, sponsored content, video promotions and campaign opportunities with Metro TV Telugu.",
};

export default function AdvertisePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-3xl">
                <div className="badge-pill mb-6">Advertise with Metro TV</div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl" style={{ lineHeight: 1.1 }}>
                  Reach Telugu Audiences<br />
                  Through <span style={{ color: "var(--red)" }}>Trusted Media</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Metro TV Telugu offers advertising and partnership opportunities for
                  brands, agencies, local businesses, institutions, campaigns and event
                  organizers reaching a focused Telugu-speaking audience.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <PhoneCall className="h-4 w-4" /> Enquire now
                  </Link>
                  <Link href="/videos" className="btn-secondary">View video showcase</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── REACH STATS ── */}
      <section className="section-space" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="container">
          <FadeIn>
            <div className="grid gap-4 md:grid-cols-4">
              {reasons.map((r) => (
                <div
                  key={r.stat}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-red)" }}
                >
                  <div className="text-xl font-black" style={{ color: "var(--red)" }}>{r.stat}</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{r.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── OPPORTUNITIES ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Advertising Opportunities"
              title="Visibility formats for modern campaigns"
              desc="Multiple business opportunities across video, editorial, events, local campaigns and sponsored content."
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-4">
            {opportunities.map((item, i) => {
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

      {/* ── CTA ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="adv-banner rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: "rgba(232,0,29,0.12)" }}
                  >
                    <Megaphone className="h-6 w-6" style={{ color: "var(--red)" }} />
                  </div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    Build campaigns with TV credibility and digital reach
                  </h2>
                </div>
                <div>
                  <p className="leading-7" style={{ color: "var(--muted)" }}>
                    From sponsored stories and video promotions to event coverage and
                    local business visibility, Metro TV Telugu is a powerful platform for
                    brands that want regional attention and trusted media presence.
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