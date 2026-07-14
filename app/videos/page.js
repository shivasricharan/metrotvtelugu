import Link from "next/link";
import { PlayCircle } from "lucide-react";
import FadeIn from "../../components/FadeIn";
import { getMetroCmsData } from "../../lib/metroCms";
import { processVideos } from "../../lib/videoUtils";
import VideosClient from "../../components/VideosClient";

// ISR: cache this page for 60 s; revalidate in the background.
// Removes force-dynamic so we stop hitting Google Apps Script on every visitor request.
export const revalidate = 60;

const INITIAL_LIMIT      = 12;
const FALLBACK_CHANNEL   = "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw";

export const metadata = {
  title: "Videos | Metro TV Telugu",
  description:
    "Watch Metro TV Telugu long videos, bulletins, discussions, interviews, public voice segments, entertainment coverage and YouTube Shorts.",
};

export default async function VideosPage() {
  // Fetch and process — only fields needed for listing are passed to the client
  const cmsData     = await getMetroCmsData("all");
  const settings    = cmsData?.settings ?? {};
  const rawVideos   = cmsData?.videos   ?? [];

  const youtubeChannel = settings.youtubechannelurl || FALLBACK_CHANNEL;

  const allVideos  = processVideos(rawVideos);
  const allLong    = allVideos.filter(v => v.videoType === "long");
  const allShorts  = allVideos.filter(v => v.videoType === "short");

  // Only send first 12 of each type to the browser
  const initialLong   = allLong.slice(0, INITIAL_LIMIT);
  const initialShorts = allShorts.slice(0, INITIAL_LIMIT);
  const hasMoreLong   = allLong.length   > INITIAL_LIMIT;
  const hasMoreShorts = allShorts.length > INITIAL_LIMIT;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill mb-6">Metro TV Telugu Videos</div>
                <h1
                  className="text-4xl font-black leading-tight md:text-6xl"
                  style={{ lineHeight: 1.1 }}
                >
                  Watch Live, Long Videos<br />
                  &amp; <span style={{ color: "var(--red)" }}>YouTube Shorts</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  News bulletins, discussions, interviews, public voice segments, special
                  reports, entertainment features and short-format updates — all in one place.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Visit YouTube Channel
                  </a>
                  <Link href="/shows"   className="btn-secondary">Explore shows</Link>
                  <Link href="/contact" className="btn-secondary">Share a story</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CLIENT COMPONENT — handles grid, Load More, modal ── */}
      <VideosClient
        initialLong={initialLong}
        initialShorts={initialShorts}
        hasMoreLong={hasMoreLong}
        hasMoreShorts={hasMoreShorts}
      />
    </>
  );
}
