import Link from "next/link";
import {
  Radio,
  SunMedium,
  Clock,
  Landmark,
  MessageCircle,
  Film,
  CalendarDays,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const shows = [
  {
    icon: SunMedium,
    title: "Morning News Live",
    tag: "Daily Bulletin",
    desc: "Start the day with key updates, regional developments and the headlines shaping the day ahead.",
  },
  {
    icon: Clock,
    title: "Prime Time Bulletin",
    tag: "Evening News",
    desc: "An evening roundup of the day’s top stories with sharper presentation and stronger audience relevance.",
  },
  {
    icon: Landmark,
    title: "Political Debate Hour",
    tag: "Debate",
    desc: "Focused conversations, diverse voices and issue-based discussions around politics, governance and public affairs.",
  },
  {
    icon: MessageCircle,
    title: "Public Voice",
    tag: "Ground Report",
    desc: "Stories, reactions and concerns from people on the ground, presented with clarity and regional context.",
  },
  {
    icon: Film,
    title: "Cinema Focus",
    tag: "Entertainment",
    desc: "Film updates, celebrity interviews, reviews and stories from the Telugu entertainment world.",
  },
  {
    icon: CalendarDays,
    title: "Weekend Special",
    tag: "Special Feature",
    desc: "Longer-format storytelling, featured interviews and special coverage that goes beyond the daily cycle.",
  },
];

export const metadata = {
  title: "Shows | Metro TV Telugu",
  description:
    "Explore Metro TV Telugu shows, bulletins, debates, public voice segments, cinema coverage and weekend specials.",
};

export default function ShowsPage() {
  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Metro TV Telugu Shows</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Programs, bulletins and conversations for Telugu audiences
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Explore Metro TV Telugu programming across daily news, prime-time
                  bulletins, political discussions, public voice segments, cinema coverage
                  and weekend specials.
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
              eyebrow="Program Lineup"
              title="Signature formats from Metro TV Telugu"
              desc="Shows can be updated with real timings, anchors, thumbnails and YouTube playlists once the final content is shared."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {shows.map((show, index) => {
              const Icon = show.icon;

              return (
                <FadeIn key={show.title} delay={index * 0.08}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <div
                      className="mb-5 flex h-44 items-center justify-center rounded-3xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(255,255,255,0.06), rgba(37,99,235,0.22))",
                      }}
                    >
                      <Icon className="h-12 w-12" style={{ color: "var(--gold)" }} />
                    </div>

                    <p
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: "var(--gold)" }}
                    >
                      {show.tag}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">{show.title}</h3>

                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {show.desc}
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
                  <Radio className="h-10 w-10" style={{ color: "var(--gold)" }} />

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    A cleaner home for every show and segment
                  </h2>
                </div>

                <div>
                  <p className="leading-8" style={{ color: "var(--muted)" }}>
                    Each show can later have its own dedicated page with description,
                    timings, anchor details, latest episodes and sponsor opportunities.
                    For the first launch, this page gives Metro TV Telugu a polished
                    program showcase.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/videos" className="btn-primary">
                      Watch episodes
                    </Link>
                    <Link href="/advertise" className="btn-secondary">
                      Sponsor a show
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