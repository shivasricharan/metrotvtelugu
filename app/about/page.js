import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

export default function AboutPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <SectionTitle
              eyebrow="About"
              title="Metro TV Telugu in a new digital format"
              desc="Metro TV Telugu is envisioned here as a more contemporary media destination that combines the strength of broadcast with the accessibility of a modern digital experience."
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 glass-strong rounded-3xl p-8 md:p-10">
            <p className="text-lg leading-8">
              Metro TV Telugu has the opportunity to evolve beyond a conventional channel presence
              and become a more engaging digital platform for Telugu-speaking audiences. With a
              stronger presentation layer for news, videos, shows and public-interest stories,
              the brand can serve viewers in a format that feels more current, more navigable and more premium.
            </p>

            <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
              This website direction focuses on improving how stories are discovered, how videos are
              experienced and how the channel is perceived by audiences, advertisers and partners.
              It is built around the idea that trust, relevance and presentation matter just as much
              online as they do on air.
            </p>

            <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
              As Metro TV Telugu grows its digital presence, a stronger web experience can become the
              foundation for richer content discovery, deeper audience engagement and future sponsor-led opportunities.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}