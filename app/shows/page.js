import Link from "next/link";
import { Radio, ExternalLink } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

export const metadata = {
  title: "Programs & Shows | Metro TV Telugu",
  description: "Explore Metro TV Telugu programs, YouTube channels for Entertainment and Health content in Telugu.",
};

const youtubeChannels = [
  {
    label: "Entertainment",
    name:  "Metro Entertainment TV",
    desc:  "Movies, celebrity interviews, film reviews, music, cultural programs and entertainment content in Telugu.",
    url:   "https://www.youtube.com/@MetroEntertainmentTv",
    color: "#f59e0b",
    bg:    "rgba(245,158,11,0.10)",
    border:"rgba(245,158,11,0.25)",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, transparent 60%)",
  },
  {
    label: "Health",
    name:  "Metro Health Updates",
    desc:  "Health tips, medical advice, wellness programs, doctor interviews and health awareness content in Telugu.",
    url:   "https://www.youtube.com/@metrohealthupdates",
    color: "#4ade80",
    bg:    "rgba(74,222,128,0.10)",
    border:"rgba(74,222,128,0.25)",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, transparent 60%)",
  },
];

export default function ShowsPage() {
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
                  <span style={{ color: "var(--red)" }}>YouTube Channels</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Follow Metro TV Telugu's dedicated YouTube channels for Entertainment
                  and Health content in Telugu.
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

      {/* ── YOUTUBE CHANNELS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="YouTube Channels"
              title="Follow us on YouTube"
              desc="Dedicated channels for Entertainment and Health content in Telugu."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {youtubeChannels.map((ch, i) => (
              <FadeIn key={ch.label} delay={i * 0.08}>
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-hover rounded-2xl overflow-hidden flex flex-col"
                  style={{ background: "var(--bg-card)", border: `1px solid ${ch.border}`, textDecoration: "none" }}
                >
                  {/* Coloured banner */}
                  <div
                    className="flex h-32 items-center justify-center"
                    style={{ background: ch.gradient }}
                  >
                    <div
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
                    >
                      <ExternalLink className="h-8 w-8" style={{ color: ch.color }} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: ch.color }}>
                        {ch.label}
                      </p>
                      <h3 className="mt-1 text-xl font-black leading-snug" style={{ color: "var(--text)" }}>
                        {ch.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>{ch.desc}</p>
                    <div
                      className="mt-auto inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
                      style={{ background: ch.bg, color: ch.color }}
                    >
                      Follow on YouTube <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
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
                    Want to sponsor or partner with our programs?
                  </h2>
                </div>
                <div>
                  <p className="leading-7" style={{ color: "var(--muted)" }}>
                    Reach Telugu audiences across news, entertainment and health content
                    through Metro TV Telugu's TV and YouTube presence.
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
