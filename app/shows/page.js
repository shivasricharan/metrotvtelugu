import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const shows = [
  {
    title: "Morning News Live",
    desc: "A daily start with key updates, regional developments and the headlines shaping the day ahead.",
  },
  {
    title: "Prime Time Bulletin",
    desc: "An evening roundup of the day’s top stories with sharper presentation and stronger audience relevance.",
  },
  {
    title: "Political Debate Hour",
    desc: "Focused conversations, diverse voices and issue-based discussions around politics, governance and public affairs.",
  },
  {
    title: "Public Voice",
    desc: "Stories, reactions and concerns from people on the ground, presented with clarity and regional context.",
  },
  {
    title: "Cinema Focus",
    desc: "A dedicated space for film updates, celebrity interviews, reviews and stories from the entertainment world.",
  },
  {
    title: "Weekend Special",
    desc: "Longer-format storytelling, featured interviews and special coverage that goes beyond the daily cycle.",
  },
];

export default function ShowsPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <SectionTitle
              eyebrow="Shows"
              title="Signature shows on Metro TV Telugu"
              desc="From daily bulletins and political debates to public voices and weekend specials, Metro TV Telugu programming can be presented in a more engaging digital format."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {shows.map((show, index) => (
            <FadeIn key={show.title} delay={index * 0.08}>
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

                <h3 className="mt-3 text-xl font-semibold">{show.title}</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {show.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}