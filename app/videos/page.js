import Link from "next/link";
import {
  PlayCircle,
  Video,
  Radio,
  MessageCircle,
  Newspaper,
  Film,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import VideoCard from "../../components/VideoCard";

const videos = [
  {
    title: "Breaking Bulletin: Top updates of the day",
    category: "News",
    videoId: "KlyvXNZWDZk",
  },
  {
    title: "Prime Time Discussion: The big political talking points",
    category: "Debate",
    videoId: "hdEp1t_PRbI",
  },
  {
    title: "Cinema Spotlight: Stories from the Telugu entertainment world",
    category: "Entertainment",
    videoId: "92DsruOUAD0",
  },
  {
    title: "On Ground Reactions: What people are saying",
    category: "Public Voice",
    videoId: "ma0ZPMJg5B4",
  },
  {
    title: "Issue Focus: A deeper look at the story behind the headlines",
    category: "Special Report",
    videoId: "fXBpB0-NFk4",
  },
  {
    title: "Top moments, big stories and standout segments of the week",
    category: "Weekend Highlights",
    videoId: "XdwVUXcL_Fs",
  },
];

const videoSections = [
  {
    icon: Newspaper,
    title: "News Bulletins",
    desc: "Daily updates, breaking developments and important regional stories.",
  },
  {
    icon: Radio,
    title: "Discussions & Debates",
    desc: "Prime-time conversations, public issues, political analysis and expert views.",
  },
  {
    icon: MessageCircle,
    title: "Public Voice",
    desc: "People-led opinions, ground reactions and community conversations.",
  },
  {
    icon: Film,
    title: "Entertainment",
    desc: "Cinema, culture, personalities, events and Telugu entertainment coverage.",
  },
];

export const metadata = {
  title: "Videos | Metro TV Telugu",
  description:
    "Watch Metro TV Telugu videos, bulletins, discussions, interviews, public voice segments and entertainment coverage.",
};

export default function VideosPage() {
  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Metro TV Telugu Videos</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Watch latest bulletins, discussions and special stories
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Explore Metro TV Telugu video coverage across news updates,
                  interviews, public voice segments, special reports, entertainment
                  features and weekly highlights.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/shows" className="btn-primary">
                    <PlayCircle className="h-4 w-4" />
                    Explore shows
                  </Link>

                  <Link href="/contact" className="btn-secondary">
                    Share a story
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
              eyebrow="Featured Videos"
              title="Video stories from Metro TV Telugu"
              desc="Selected YouTube videos can be highlighted here for viewers to quickly discover important updates and featured segments."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video, index) => (
              <FadeIn key={video.title} delay={index * 0.08}>
                <VideoCard
                  title={video.title}
                  category={video.category}
                  videoId={video.videoId}
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
              eyebrow="Video Categories"
              title="Browse by format and interest"
              desc="A structured video section makes the site useful for regular viewers and easier to update as Metro TV adds more content."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-4">
            {videoSections.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
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
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <Video className="h-10 w-10" style={{ color: "var(--gold)" }} />
                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Built around video-first discovery
                  </h2>
                </div>

                <div>
                  <p className="leading-8" style={{ color: "var(--muted)" }}>
                    The videos page can become one of the strongest parts of the website,
                    especially if Metro TV Telugu regularly updates YouTube links,
                    featured interviews, bulletins, debates and short-format stories.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/news" className="btn-primary">
                      Explore news
                    </Link>
                    <Link href="/advertise" className="btn-secondary">
                      Sponsor video content
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