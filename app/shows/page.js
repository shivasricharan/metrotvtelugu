import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const shows = [
  "Prime Time Bulletin",
  "Morning News Live",
  "Political Debate Hour",
  "Weekend Special",
  "Cinema Focus",
  "Public Voice",
];

export default function ShowsPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <SectionTitle
              eyebrow="Shows"
              title="Flagship programming presented with stronger visual appeal"
              desc="This page shows how Metro TV Telugu programs can be surfaced in a more modern and audience-friendly way."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {shows.map((show, index) => (
            <FadeIn key={show} delay={index * 0.08}>
              <div className="glass-strong card-hover rounded-3xl p-6">
                <div
                  className="mb-5 h-44 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239,68,68,0.20), rgba(255,255,255,0.05), rgba(37,99,235,0.20))",
                  }}
                />

                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--gold)" }}
                >
                  Featured Program
                </p>

                <h3 className="mt-3 text-xl font-semibold">{show}</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  A cleaner showcase for anchors, timings, featured episodes and
                  show-led discovery.
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}