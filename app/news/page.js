import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import NewsCard from "../../components/NewsCard";

const newsItems = [
  {
    category: "Top Story",
    title: "Major developments that shape the day, presented with stronger digital clarity",
    excerpt: "A visually stronger format for the most important updates, giving viewers a faster way to catch up.",
  },
  {
    category: "Telangana",
    title: "State stories, civic issues and regional developments in sharper focus",
    excerpt: "A dedicated layer for relevant coverage from across Telangana, with a presentation style built for quick discovery.",
  },
  {
    category: "Andhra Pradesh",
    title: "Regional stories and public developments that matter to Telugu audiences",
    excerpt: "A stronger digital format for policy updates, civic stories and community-level developments.",
  },
  {
    category: "National",
    title: "Important national updates, curated for relevance and readability",
    excerpt: "A clean editorial structure helps audiences move quickly through key developments and major national stories.",
  },
  {
    category: "Business",
    title: "Business, economy and policy stories with more room for depth",
    excerpt: "A modern page system helps explain market, industry and policy developments in a more accessible way.",
  },
  {
    category: "Entertainment",
    title: "Cinema and culture stories presented for recurring digital engagement",
    excerpt: "A more polished entertainment section can bring audiences back more often for fresh updates and features.",
  },
];

export default function NewsPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <SectionTitle
              eyebrow="News"
              title="Latest news and regional coverage"
              desc="A structured digital newsroom for viewers looking to quickly discover updates across Telangana, Andhra Pradesh, national affairs, business, entertainment and more."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <NewsCard
                category={item.category}
                title={item.title}
                excerpt={item.excerpt}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}