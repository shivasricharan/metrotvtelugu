import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import NewsCard from "../../components/NewsCard";

const newsItems = [
  {
    category: "Top Story",
    title: "Main headlines can feel more premium and current",
    excerpt: "A more polished layout gives editorial content stronger visual authority.",
  },
  {
    category: "Telangana",
    title: "Regional updates can be easier to scan and explore",
    excerpt: "A modern card-led experience helps users discover more stories without friction.",
  },
  {
    category: "Andhra Pradesh",
    title: "State-level coverage can become more structured",
    excerpt: "This creates a more editorially organized experience for daily visitors.",
  },
  {
    category: "National",
    title: "National stories can sit inside clean, readable layouts",
    excerpt: "Even placeholder content looks more credible with premium presentation.",
  },
  {
    category: "Business",
    title: "Business updates can open new sponsor possibilities",
    excerpt: "This also supports future monetization through category-led brand alignment.",
  },
  {
    category: "Entertainment",
    title: "Cinema and culture can be visually stronger",
    excerpt: "This is especially useful for younger digital audiences and recurring traffic.",
  },
];

export default function NewsPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-[30px] p-8 md:p-10">
            <SectionTitle
              eyebrow="News"
              title="A premium editorial presentation for Metro TV Telugu"
              desc="Designed to make the digital news layer feel more serious, elegant and easier to browse."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <NewsCard {...item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
