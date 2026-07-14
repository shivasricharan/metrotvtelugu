"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { formatIndianDate } from "../lib/videoUtils";

// Lazy-load modal — only downloaded when first video is clicked
const VideoModal = dynamic(() => import("./VideoModal"), { ssr: false });

// ─── Thumbnail card ────────────────────────────────────────────────────────────

function VideoThumbCard({ video, priority, onPlay }) {
  const isShort    = video.videoType === "short";
  const dateLabel  = video.publishedDate ? formatIndianDate(video.publishedDate) : "";

  function handleError(e) {
    // hqdefault may 404 for brand-new uploads — fall back down the quality chain
    const src = e.target.src;
    if (src.includes("hqdefault")) {
      e.target.src = `https://i.ytimg.com/vi/${video.id}/sddefault.jpg`;
    } else if (src.includes("sddefault")) {
      e.target.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
    }
    // mqdefault almost always exists; if it also fails the browser shows nothing (acceptable)
  }

  return (
    <button
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
      className="group card-hover rounded-2xl overflow-hidden text-left w-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", display: "block" }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden bg-black"
        style={{ aspectRatio: isShort ? "9/16" : "16/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={isShort ? 270 : 480}
          height={isShort ? 480 : 270}
          onError={handleError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Metro TV play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-colors duration-200"
          style={{ background: "rgba(0,0,0,0.20)" }}
          aria-hidden="true"
        >
          <div
            className="flex items-center justify-center rounded-full shadow-xl transition-transform duration-200 group-hover:scale-110"
            style={{ width: "52px", height: "52px", background: "var(--red)" }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </div>

        {video.featured && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white rounded"
            style={{ background: "var(--red)" }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className="text-xs font-black uppercase tracking-[0.15em] truncate"
            style={{ color: "var(--red)" }}
          >
            {video.category}
          </span>
          {dateLabel && (
            <span className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>
              {dateLabel}
            </span>
          )}
        </div>
        <h3
          className="text-sm font-semibold leading-5"
          style={{ color: "var(--text)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {video.title}
        </h3>
      </div>
    </button>
  );
}

// ─── Load More button ──────────────────────────────────────────────────────────

function LoadMore({ loading, hasMore, error, onLoad }) {
  if (!hasMore && !error) {
    return (
      <p className="text-center text-xs py-5" style={{ color: "var(--muted)" }}>
        All videos loaded
      </p>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      {error && (
        <p className="text-xs mb-1" style={{ color: "var(--red)" }}>{error}</p>
      )}
      <button
        onClick={onLoad}
        disabled={loading}
        className="btn-secondary"
        style={{ opacity: loading ? 0.55 : 1, cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Loading…" : error ? "Retry" : "Load More"}
      </button>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHead({ eyebrow, title, desc }) {
  return (
    <div className="mb-8">
      <p
        className="text-xs font-black uppercase tracking-[0.22em] mb-2"
        style={{ color: "var(--red)" }}
      >
        {eyebrow}
      </p>
      <h2 className="text-2xl font-black leading-tight md:text-3xl" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {desc && (
        <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{desc}</p>
      )}
    </div>
  );
}

// ─── Main client component ─────────────────────────────────────────────────────

export default function VideosClient({
  initialLong,
  initialShorts,
  hasMoreLong:   initHasMoreLong,
  hasMoreShorts: initHasMoreShorts,
}) {
  // Long videos state
  const [longVideos,   setLongVideos]   = useState(initialLong);
  const [longCursor,   setLongCursor]   = useState(String(initialLong.length));
  const [hasMoreLong,  setHasMoreLong]  = useState(initHasMoreLong);
  const [loadingLong,  setLoadingLong]  = useState(false);
  const [errorLong,    setErrorLong]    = useState(null);

  // Shorts state
  const [shorts,       setShorts]       = useState(initialShorts);
  const [shortCursor,  setShortCursor]  = useState(String(initialShorts.length));
  const [hasMoreShorts,setHasMoreShorts]= useState(initHasMoreShorts);
  const [loadingShorts,setLoadingShorts]= useState(false);
  const [errorShorts,  setErrorShorts]  = useState(null);

  // Modal state
  const [activeVideo, setActiveVideo] = useState(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  const loadMoreLong = useCallback(async () => {
    setLoadingLong(true);
    setErrorLong(null);
    try {
      const res  = await fetch(`/api/videos?type=long&cursor=${longCursor}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLongVideos(prev => [...prev, ...data.items]);
      setLongCursor(data.nextCursor);
      setHasMoreLong(data.hasMore);
    } catch {
      setErrorLong("Failed to load more videos. Tap to retry.");
    } finally {
      setLoadingLong(false);
    }
  }, [longCursor]);

  const loadMoreShorts = useCallback(async () => {
    setLoadingShorts(true);
    setErrorShorts(null);
    try {
      const res  = await fetch(`/api/videos?type=short&cursor=${shortCursor}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setShorts(prev => [...prev, ...data.items]);
      setShortCursor(data.nextCursor);
      setHasMoreShorts(data.hasMore);
    } catch {
      setErrorShorts("Failed to load more Shorts. Tap to retry.");
    } finally {
      setLoadingShorts(false);
    }
  }, [shortCursor]);

  // Featured: long videos marked featured
  const featured = longVideos.filter(v => v.featured);

  return (
    <>
      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section className="section-space" style={{ paddingTop: "32px", paddingBottom: "16px" }}>
          <div className="container">
            <SectionHead
              eyebrow="Featured"
              title="Editor's picks"
              desc=""
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((v, i) => (
                <VideoThumbCard key={v.id} video={v} priority={i < 2} onPlay={setActiveVideo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Long Videos ── */}
      <section className="section-space" style={{ paddingTop: featured.length > 0 ? "16px" : "48px", paddingBottom: "48px" }}>
        <div className="container">
          <SectionHead
            eyebrow="Long Videos"
            title="Bulletins, discussions and special video stories"
            desc="Selected long-format videos including bulletins, debates, interviews, public voice segments and special reports."
          />
          {longVideos.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>No videos available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {longVideos.map((v, i) => (
                <VideoThumbCard key={v.id} video={v} priority={i < 2} onPlay={setActiveVideo} />
              ))}
            </div>
          )}
          <LoadMore
            loading={loadingLong}
            hasMore={hasMoreLong}
            error={errorLong}
            onLoad={loadMoreLong}
          />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Shorts ── */}
      <section className="section-space" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="container">
          <SectionHead
            eyebrow="YouTube Shorts"
            title="Short updates in a mobile-first format"
            desc="Quick video updates from the Metro TV Telugu YouTube channel."
          />
          {shorts.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>No Shorts available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shorts.map((v, i) => (
                <VideoThumbCard key={v.id} video={v} priority={i < 2} onPlay={setActiveVideo} />
              ))}
            </div>
          )}
          <LoadMore
            loading={loadingShorts}
            hasMore={hasMoreShorts}
            error={errorShorts}
            onLoad={loadMoreShorts}
          />
        </div>
      </section>

      {/* ── Modal — exactly one iframe, only when open ── */}
      {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
    </>
  );
}
