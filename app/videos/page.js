import Link from "next/link";
import {
  PlayCircle,
  Video,
  Radio,
  MessageCircle,
  Newspaper,
  Film,
  ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import VideoCard from "../../components/VideoCard";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackYoutubeChannel = "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw";

const fallbackLongVideos = [
  { title: "Breaking Bulletin: Top updates of the day",                   category: "News",          videoId: "KlyvXNZWDZk" },
  { title: "Prime Time Discussion: The big political talking points",      category: "Debate",        videoId: "hdEp1t_PRbI" },
  { title: "Cinema Spotlight: Stories from the Telugu entertainment world",category: "Entertainment", videoId: "92DsruOUAD0" },
];

const fallbackShorts = [
  { title: "Short Update",           category: "Shorts",       videoId: "KlyvXNZWDZk" },
  { title: "Public Voice Short Clip",category: "Public Voice", videoId: "hdEp1t_PRbI" },
  { title: "Breaking News Short",    category: "News",         videoId: "92DsruOUAD0" },
];

const videoCategories = [
  { icon: Newspaper,    title: "News Bulletins",      desc: "Daily updates, breaking developments and important regional stories." },
  { icon: Radio,        title: "Discussions & Debates",desc: "Prime-time conversations, public issues, political analysis and expert views." },
  { icon: MessageCircle,title: "Public Voice",         desc: "People-led opinions, ground reactions and community conversations." },
  { icon: Film,         title: "Entertainment",        desc: "Cinema, culture, personalities, events and Telugu entertainment coverage." },
];

export const metadata = {
  title: "Videos | Metro TV Telugu",
  description: "Watch Metro TV Telugu long videos, bulletins, discussions, interviews, public voice segments, entertainment coverage and YouTube Shorts.",
};

function normalizeVideo(item) {
  return {
    title:       item.title       || "Video Update",
    category:    item.category    || "Video",
    videoId:     item.youTubeID   || item.youtubeId || item.videoId || "",
    videoType:   item.videoType   || item.type      || "Long",
    description: item.description || "",
  };
}

function ShortCard({ short }) {
  return (
    <div
      className="card-hover rounded-2xl p-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div
        className="relative overflow-hidden rounded-xl border bg-black mx-auto"
        style={{ borderColor: "var(--border)", aspectRatio: "9/16", maxWidth: "240px" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${short.videoId}`}
          title={short.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "var(--red)" }}>
          {short.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-6">{short.title}</h3>
      </div>
    </div>
  );
}

export default async function VideosPage() {
  const cmsData  = await getMetroCmsData("all");
  const settings = cmsData?.settings || {};
  const cmsVideos = Array.isArray(cmsData?.videos) ? cmsData.videos : [];

  const youtubeChannel = settings.youtubechannelurl || fallbackYoutubeChannel;

  const normalizedVideos = cmsVideos.map(normalizeVideo).filter((v) => v.videoId);
  const cmsLong   = normalizedVideos.filter((v) => String(v.videoType).toLowerCase() === "long");
  const cmsShorts = normalizedVideos.filter((v) => String(v.videoType).toLowerCase() === "short");

  const longVideos = cmsLong.length   > 0 ? cmsLong   : fallbackLongVideos;
  const shorts     = cmsShorts.length > 0 ? cmsShorts : fallbackShorts;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill mb-6">Metro TV Telugu Videos</div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl" style={{ lineHeight: 1.1 }}>
                  Watch Live, Long Videos<br />
                  &amp; <span style={{ color: "var(--red)" }}>YouTube Shorts</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  News bulletins, discussions, interviews, public voice segments, special
                  reports, entertainment features and short-format updates — all in one place.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={youtubeChannel} target="_blank" rel="noreferrer" className="btn-primary">
                    <PlayCircle className="h-4 w-4" />
                    Visit YouTube Channel
                  </a>
                  <Link href="/shows" className="btn-secondary">Explore shows</Link>
                  <Link href="/contact" className="btn-secondary">Share a story</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── LONG VIDEOS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Long Videos"
              title="Bulletins, discussions and special video stories"
              desc="Selected long-format videos including bulletins, debates, interviews, public voice segments and special reports."
            />
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {longVideos.map((video, i) => (
              <FadeIn key={`${video.videoId}-${i}`} delay={i * 0.08}>
                <VideoCard title={video.title} category={video.category} videoId={video.videoId} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-8">
            <a href={youtubeChannel} target="_blank" rel="noreferrer" className="btn-secondary">
              View more on YouTube <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SHORTS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="YouTube Shorts"
              title="Short updates in a mobile-first format"
              desc="Quick video updates from the Metro TV Telugu YouTube channel."
            />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shorts.map((short, i) => (
              <FadeIn key={`${short.videoId}-${i}`} delay={i * 0.08}>
                <ShortCard short={short} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-8">
            <a href={youtubeChannel} target="_blank" rel="noreferrer" className="btn-secondary">
              Watch more Shorts on YouTube <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CATEGORIES ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Video Categories"
              title="Browse by format and interest"
              desc="A structured video section useful for regular viewers and easy to update as more content is added."
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-4">
            {videoCategories.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div
                    className="card-hover rounded-2xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}