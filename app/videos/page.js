import Link from "next/link";
import {
  PlayCircle,
  Video,
  Radio,
  MessageCircle,
  Newspaper,
  Film,
  MonitorSmartphone,
  ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import VideoCard from "../../components/VideoCard";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackYoutubeChannel =
  "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw";

const fallbackLongVideos = [
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
];

const fallbackShorts = [
  {
    title: "Metro TV Telugu Short Update",
    category: "Shorts",
    videoId: "KlyvXNZWDZk",
  },
  {
    title: "Public Voice Short Clip",
    category: "Public Voice",
    videoId: "hdEp1t_PRbI",
  },
  {
    title: "Breaking News Short",
    category: "News",
    videoId: "92DsruOUAD0",
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
    "Watch Metro TV Telugu long videos, bulletins, discussions, interviews, public voice segments, entertainment coverage and YouTube Shorts.",
};

function normalizeVideo(item) {
  return {
    title: item.title || "Metro TV Telugu Video",
    category: item.category || "Video",
    videoId: item.youTubeID || item.youtubeId || item.videoId || "",
    videoType: item.videoType || item.type || "Long",
    description: item.description || "",
    publishedDate: item.publishedDate || "",
    featured: item.featured || "",
  };
}

function ShortCard({ short }) {
  return (
    <div className="glass-strong card-hover rounded-4xl p-4">
      <div className="mx-auto max-w-60">
        <div
          className="relative overflow-hidden rounded-3xl border bg-black"
          style={{
            borderColor: "var(--border)",
            aspectRatio: "9 / 16",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${short.videoId}`}
            title={short.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-5">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--gold)" }}
        >
          {short.category}
        </p>

        <h3 className="mt-3 text-lg font-semibold leading-snug">{short.title}</h3>

        {short.description ? (
          <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
            {short.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default async function VideosPage() {
  const cmsData = await getMetroCmsData("all");

  const settings = cmsData?.settings || {};
  const cmsVideos = Array.isArray(cmsData?.videos) ? cmsData.videos : [];

  const youtubeChannel = settings.youtubechannelurl || fallbackYoutubeChannel;

  const normalizedVideos = cmsVideos
    .map(normalizeVideo)
    .filter((video) => video.videoId);

  const cmsLongVideos = normalizedVideos.filter(
    (video) => String(video.videoType).toLowerCase() === "long"
  );

  const cmsShorts = normalizedVideos.filter(
    (video) => String(video.videoType).toLowerCase() === "short"
  );

  const longVideos = cmsLongVideos.length > 0 ? cmsLongVideos : fallbackLongVideos;
  const shorts = cmsShorts.length > 0 ? cmsShorts : fallbackShorts;

  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Metro TV Telugu Videos</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Watch long videos, latest updates and YouTube Shorts
                </h1>

                <p
                  className="mt-6 text-lg leading-8"
                  style={{ color: "var(--muted)" }}
                >
                  Explore Metro TV Telugu video coverage across news bulletins,
                  discussions, interviews, public voice segments, special reports,
                  entertainment features and short-format updates.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Visit YouTube Channel
                  </a>

                  <Link href="/shows" className="btn-secondary">
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
              eyebrow="Long Videos"
              title="Bulletins, discussions and special video stories"
              desc="Watch selected Metro TV Telugu long-format videos including bulletins, debates, interviews, public voice segments and special reports."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {longVideos.map((video, index) => (
              <FadeIn key={`${video.videoId}-${index}`} delay={index * 0.08}>
                <VideoCard
                  title={video.title}
                  category={video.category}
                  videoId={video.videoId}
                />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              View more on YouTube
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="YouTube Shorts"
              title="Short updates in a mobile-first format"
              desc="Metro TV Telugu Shorts can be displayed like mobile screens, making the website feel current for viewers who consume quick video updates."
            />
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shorts.map((short, index) => (
              <FadeIn key={`${short.videoId}-${index}`} delay={index * 0.08}>
                <ShortCard short={short} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={youtubeChannel}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Watch more Shorts on YouTube
              <ExternalLink className="h-4 w-4" />
            </a>
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
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: "var(--muted)" }}
                    >
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
                    The videos page can become one of the strongest parts of the website.
                    Long videos can showcase depth, while Shorts can keep the website fresh
                    with regular quick updates from Metro TV Telugu’s YouTube channel.
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

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <MonitorSmartphone
                    className="h-10 w-10"
                    style={{ color: "var(--gold)" }}
                  />
                  <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                    Long videos and Shorts can be managed from Google Sheets
                  </h2>
                </div>

                <div>
                  <p className="leading-8" style={{ color: "var(--muted)" }}>
                    Metro TV Telugu can manage long videos and Shorts from Google Sheets.
                    The team can add YouTube IDs, choose whether a video is Long or Short,
                    and publish or hide content without touching code.
                  </p>

                  <div className="mt-8">
                    <a
                      href={youtubeChannel}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      Open Metro TV Telugu YouTube
                      <ExternalLink className="h-4 w-4" />
                    </a>
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