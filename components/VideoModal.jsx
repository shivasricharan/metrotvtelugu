"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const isShort = video.videoType === "short";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`relative flex flex-col gap-3 ${
          isShort ? "w-full max-w-xs" : "w-full max-w-4xl"
        }`}
      >
        {/* Top bar: title + close */}
        <div className="flex items-start justify-between gap-3">
          <p
            className="text-sm font-semibold leading-5 line-clamp-2"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {video.title}
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close video"
            className="flex-shrink-0 flex items-center gap-1 text-xs font-bold rounded-md px-2 py-1 hover:bg-white/10 transition-colors"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>

        {/* iframe — only ever one, only when modal is open */}
        <div
          className="relative bg-black rounded-xl overflow-hidden"
          style={{
            aspectRatio: isShort ? "9/16" : "16/9",
            maxHeight:   isShort ? "78vh" : undefined,
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Press <kbd className="px-1 rounded" style={{ background: "rgba(255,255,255,0.10)" }}>Esc</kbd> or click outside to close
        </p>
      </div>
    </div>
  );
}
