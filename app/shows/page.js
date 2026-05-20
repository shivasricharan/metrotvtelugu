import Link from "next/link";
import {
  Radio, SunMedium, Clock, Landmark, MessageCircle, Film,
  CalendarDays, Briefcase, HeartPulse, GraduationCap,
  Building2, Leaf, Sparkles,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const iconPool = [
  SunMedium, Clock, Landmark, MessageCircle, Film, CalendarDays,
  Briefcase, HeartPulse, GraduationCap, Building2, Leaf, Sparkles,
];

const fallbackShows = [
  { showName: "Lifestyle, Fashion, Health and Beauty", category: "Lifestyle",     description: "Programs and features covering lifestyle, fashion, wellness, health, beauty and everyday living.",                             timing: "To be updated", anchor: "Metro TV Team" },
  { showName: "Women & Child",                          category: "Social Issues", description: "Coverage focused on women, child welfare, family issues, social awareness and community development.",                           timing: "To be updated", anchor: "Metro TV Team" },
  { showName: "Business – Service Sector",              category: "Business",      description: "Stories and discussions around the service sector, local businesses, entrepreneurship and industry growth.",                      timing: "To be updated", anchor: "Metro TV Team" },
  { showName: "Finance, Banking & Insurance",           category: "Finance",       description: "Features and discussions around finance, banking, insurance, investment awareness and financial services.",                       timing: "To be updated", anchor: "Metro TV Team" },
  { showName: "Education, Training",                    category: "Education",     description: "Stories on education, institutions, training programs, skill development and career-oriented learning.",                         timing: "To be updated", anchor: "Metro TV Team" },
  { showName: "News & Views",                           category: "News",          description: "News analysis, public opinion, discussions, interviews and issue-based commentary.",                                             timing: "To be updated", anchor: "Metro TV Team" },
];

export const metadata = {
  title: "Programs & Shows | Metro TV Telugu",
  description: "Explore Metro TV Telugu programs, content verticals, coverage areas, shows, public-interest stories and featured segments.",
};

function normalizeShow(item) {
  return {
    showName:    item.showName    || item.title       || "Program",
    category:    item.category    || "Program",
    description: item.description || item.desc        || "Program details from the channel.",
    timing:      item.timing      || "To be updated",
    anchor:      item.anchor      || "Metro TV Team",
  };
}

export default async function ShowsPage() {
  const cmsShows = await getMetroCmsData("shows");
  const shows = Array.isArray(cmsShows) && cmsShows.length > 0
    ? cmsShows.map(normalizeShow)
    : fallbackShows;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill mb-6">Metro TV Telugu Programs</div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl" style={{ lineHeight: 1.1 }}>
                  Shows, Programs &amp;<br />
                  <span style={{ color: "var(--red)" }}>Coverage Areas</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Programming across news, business, lifestyle, education, health,
                  entertainment, public issues, technology, agriculture, spirituality,
                  civic stories and community-focused content.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/videos" className="btn-primary">Watch featured videos</Link>
                  <Link href="/contact" className="btn-secondary">Contact programming team</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SHOWS GRID ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Programs & Coverage Areas"
              title="Content verticals and recurring program themes"
              desc="Program categories updated directly from the Google Sheets CMS by the team."
            />
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-3">
            {shows.map((show, index) => {
              const Icon = iconPool[index % iconPool.length];
              return (
                <FadeIn key={`${show.showName}-${index}`} delay={index * 0.04}>
                  <div
                    className="card-hover rounded-2xl overflow-hidden"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    {/* Coloured icon banner */}
                    <div
                      className="flex h-28 items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(232,0,29,0.15), rgba(29,111,164,0.12))" }}
                    >
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: "rgba(232,0,29,0.12)", border: "1px solid var(--border-red)" }}
                      >
                        <Icon className="h-7 w-7" style={{ color: "var(--red)" }} />
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--red)" }}>
                        {show.category}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug">{show.showName}</h3>
                      <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
                        {show.description}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm">
                        <div
                          className="rounded-xl px-4 py-2.5"
                          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                        >
                          <span className="font-semibold">Timing: </span>
                          <span style={{ color: "var(--muted)" }}>{show.timing}</span>
                        </div>
                        <div
                          className="rounded-xl px-4 py-2.5"
                          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                        >
                          <span className="font-semibold">Anchor: </span>
                          <span style={{ color: "var(--muted)" }}>{show.anchor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CTA STRIP ── */}
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
                    <Radio className="h-6 w-6" style={{ color: "var(--red)" }} />
                  </div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    A flexible home for every program and content vertical
                  </h2>
                </div>
                <div>
                  <p className="leading-7" style={{ color: "var(--muted)" }}>
                    The team can manage program names, categories, descriptions, timings
                    and anchors directly from Google Sheets — no code needed.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/videos"    className="btn-primary">Watch episodes</Link>
                    <Link href="/advertise" className="btn-secondary">Sponsor a program</Link>
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