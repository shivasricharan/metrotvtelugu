import Link from "next/link";
import {
  Radio,
  SunMedium,
  Clock,
  Landmark,
  MessageCircle,
  Film,
  CalendarDays,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Building2,
  Leaf,
  Sparkles,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const iconPool = [
  SunMedium,
  Clock,
  Landmark,
  MessageCircle,
  Film,
  CalendarDays,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Building2,
  Leaf,
  Sparkles,
];

const fallbackShows = [
  {
    showName: "Lifestyle, Fashion, Health and Beauty",
    category: "Lifestyle",
    description:
      "Programs and features covering lifestyle, fashion, wellness, health, beauty and everyday living.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
  {
    showName: "Women & Child",
    category: "Social Issues",
    description:
      "Coverage focused on women, child welfare, family issues, social awareness and community development.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
  {
    showName: "Business – Service Sector",
    category: "Business",
    description:
      "Stories and discussions around the service sector, local businesses, entrepreneurship and industry growth.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
  {
    showName: "Finance, Banking & Insurance",
    category: "Finance",
    description:
      "Features and discussions around finance, banking, insurance, investment awareness and financial services.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
  {
    showName: "Education, Training",
    category: "Education",
    description:
      "Stories on education, institutions, training programs, skill development and career-oriented learning.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
  {
    showName: "News & Views",
    category: "News",
    description:
      "News analysis, public opinion, discussions, interviews and issue-based commentary.",
    timing: "To be updated",
    anchor: "Metro TV Team",
  },
];

export const metadata = {
  title: "Programs & Shows | Metro TV Telugu",
  description:
    "Explore Metro TV Telugu programs, content verticals, coverage areas, shows, public-interest stories and featured segments.",
};

function normalizeShow(item) {
  return {
    showName: item.showName || item.title || "Metro TV Telugu Program",
    category: item.category || "Program",
    description:
      item.description ||
      item.desc ||
      "Program details and coverage information from Metro TV Telugu.",
    timing: item.timing || "To be updated",
    anchor: item.anchor || "Metro TV Team",
  };
}

export default async function ShowsPage() {
  const cmsShows = await getMetroCmsData("shows");

  const shows = Array.isArray(cmsShows) && cmsShows.length > 0
    ? cmsShows.map(normalizeShow)
    : fallbackShows;

  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Metro TV Telugu Programs</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Shows, programs and coverage areas for Telugu audiences
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Explore Metro TV Telugu programming across news, business, lifestyle,
                  education, health, entertainment, public issues, technology, agriculture,
                  spirituality, civic stories and community-focused content.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/videos" className="btn-primary">
                    Watch featured videos
                  </Link>

                  <Link href="/contact" className="btn-secondary">
                    Contact programming team
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
              eyebrow="Programs & Coverage Areas"
              title="Content verticals from Metro TV Telugu"
              desc="These program categories can be updated directly from the Google Sheets CMS by the Metro TV team."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {shows.map((show, index) => {
              const Icon = iconPool[index % iconPool.length];

              return (
                <FadeIn key={`${show.showName}-${index}`} delay={index * 0.04}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <div
                      className="mb-5 flex h-36 items-center justify-center rounded-3xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(255,255,255,0.06), rgba(37,99,235,0.22))",
                      }}
                    >
                      <Icon className="h-11 w-11" style={{ color: "var(--gold)" }} />
                    </div>

                    <p
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--gold)" }}
                    >
                      {show.category}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-snug">
                      {show.showName}
                    </h3>

                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {show.description}
                    </p>

                    <div className="mt-5 grid gap-2 text-sm">
                      <div className="glass rounded-2xl px-4 py-3">
                        <span className="font-semibold">Timing: </span>
                        <span style={{ color: "var(--muted)" }}>{show.timing}</span>
                      </div>

                      <div className="glass rounded-2xl px-4 py-3">
                        <span className="font-semibold">Anchor / Team: </span>
                        <span style={{ color: "var(--muted)" }}>{show.anchor}</span>
                      </div>
                    </div>
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
                  <Radio className="h-10 w-10" style={{ color: "var(--gold)" }} />

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    A flexible home for every program and content vertical
                  </h2>
                </div>

                <div>
                  <p className="leading-8" style={{ color: "var(--muted)" }}>
                    Metro TV Telugu can manage program names, categories, descriptions,
                    timings and anchors directly from Google Sheets. This keeps the website
                    easy to update without touching code.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/videos" className="btn-primary">
                      Watch episodes
                    </Link>
                    <Link href="/advertise" className="btn-secondary">
                      Sponsor a program
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