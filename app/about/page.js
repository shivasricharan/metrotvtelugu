import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

export default function AboutPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-[30px] p-8 md:p-10">
            <SectionTitle
              eyebrow="About"
              title="Metro TV Telugu can look more contemporary without losing trust"
              desc="This demo page shows how a traditional media brand can step into a richer digital format."
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 glass-strong rounded-[28px] p-8 md:p-10">
            <p className="text-lg leading-8">
              Metro TV Telugu already carries the weight of a broadcast identity.
              The digital layer now needs to reflect that credibility in a more premium,
              structured and visually engaging format.
            </p>
            <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
              This demo illustrates that direction through a modern interface for stories,
              shows, video and audience discovery. It is not the full system yet — it is a
              convincing preview of what the full system can become.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
