"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { formatIndianDate } from "../lib/videoUtils";

const VideoModal = dynamic(() => import("./VideoModal"), { ssr: false });

function HomeVideoCard({ video, priority, onPlay }) {
  const dateLabel = video.publishedDate ? formatIndianDate(video.publishedDate) : "";

  function handleError(e) {
    const src = e.target.src;
    if (src.includes("hqdefault")) {
      e.target.src = `https://i.ytimg.com/vi/${video.id}/sddefault.jpg`;
    } else if (src.includes("sddefault")) {
      e.target.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
    }
  }

  return (
    <button
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
      className="group card-hover rounded-2xl overflow-hidden text-left w-full"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", display: "block" }}
    >
      <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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
      </div>

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
          style={{
            color: "var(--text)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </h3>
      </div>
    </button>
  );
}

export default function HomeVideosSection({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {videos.map((video, i) => (
          <HomeVideoCard key={video.id} video={video} priority={i < 2} onPlay={setActiveVideo} />
        ))}
      </div>
      {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
    </>
  );
}
