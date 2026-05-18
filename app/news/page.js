import Link from "next/link";
import {
  ArrowRight,
  Newspaper,
  MapPin,
  Landmark,
  Film,
  Briefcase,
  Globe2,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import NewsCard from "../../components/NewsCard";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackStories = [
  {
    category: "Top Story",
    title: "Public issues, regional developments and stories that shape the day",
    excerpt:
      "Follow important updates, civic conversations and people-first stories from across Telugu-speaking communities.",
    date: "2026-05-18",
  },
  {
    category: "Telangana",
    title: "State updates, civic issues and local developments from Telangana",
    excerpt:
      "Coverage focused on governance, public services, city updates, community issues and regional voices.",
    date: "2026-05-18",
  },
  {
    category: "Andhra Pradesh",
    title: "Important stories and regional developments from Andhra Pradesh",
    excerpt:
      "Updates across politics, society, public issues, development, community stories and local conversations.",
    date: "2026-05-18",
  },
];

const categories = [
  {
    icon: Newspaper,
    title: "Top Stories",
    desc: "Important updates and major stories of the day.",
  },
  {
    icon: MapPin,
    title: "Telangana",
    desc: "Hyderabad, districts, civic updates and regional news.",
  },
  {
    icon: Landmark,
    title: "Andhra Pradesh",
    desc: "Public issues, governance, local stories and state updates.",
  },
  {
    icon: Globe2,
    title: "National",
    desc: "Key national developments curated for Telugu audiences.",
  },
  {
    icon: Briefcase,
    title: "Business",
    desc: "Economy, industries, local enterprise and market updates.",
  },
  {
    icon: Film,
    title: "Entertainment",
    desc: "Cinema, culture, personalities, events and entertainment stories.",
  },
];

export const metadata = {
  title: "News | Metro TV Telugu",
  description:
    "Latest news, regional updates, Telangana, Andhra Pradesh, national affairs, business and entertainment stories from Metro TV Telugu.",
};

function normalizeNews(item) {
  return {
    title: item.title || "News Update",
    category: item.category || "News",
    excerpt:
      item.excerpt ||
      item.description ||
      "Latest update from the newsroom.",
    date: item.date || "",
  };
}

export default async function NewsPage() {
  const cmsNews = await getMetroCmsData("news");

  const stories =
    Array.isArray(cmsNews) && cmsNews.length > 0
      ? cmsNews.map(normalizeNews)
      : fallbackStories;

  const featuredStories = stories.slice(0, 6);
  const latestUpdates = stories.slice(0, 4);

  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Metro TV Telugu News</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Latest news, regional updates and public-interest stories
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Stay connected with stories from Telangana, Andhra Pradesh, national
                  affairs, business, entertainment and community conversations that matter
                  to Telugu-speaking audiences.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Featured Coverage"
              title="Stories that matter today"
              desc="Important updates and editorial sections can be updated directly from the Google Sheets CMS."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((item, index) => (
              <FadeIn key={`${item.title}-${index}`} delay={index * 0.08}>
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

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="News Categories"
              title="Browse coverage by section"
              desc="A clean category structure makes the website easier for viewers and more useful for future content updates."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {item.desc}
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
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                <div>
                  <div className="badge-pill">Latest Updates</div>

                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    A faster way to follow important stories
                  </h2>

                  <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                    The team can update news titles, categories, excerpts and publishing
                    status from Google Sheets. Rows marked as Published will appear on the
                    website automatically.
                  </p>

                  <div className="mt-8">
                    <Link href="/videos" className="btn-primary">
                      Watch latest videos
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4">
                  {latestUpdates.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="glass rounded-3xl p-5">
                      <div
                        className="text-xs font-bold uppercase tracking-[0.18em]"
                        style={{ color: "var(--gold)" }}
                      >
                        {item.category}
                      </div>

                      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>

                      {item.date ? (
                        <p
                          className="mt-2 text-sm leading-7"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.date}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}