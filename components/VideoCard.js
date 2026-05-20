import { PlayCircle } from "lucide-react";

export default function VideoCard({ title, category, videoId }) {
  return (
    <div
      className="card-hover rounded-2xl overflow-hidden"
      style={{
        background:  "var(--bg-card)",
        border:      "1px solid var(--border)",
      }}
    >
      <div className="embed-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-xs font-black uppercase tracking-[0.18em]"
            style={{ color: "var(--red)" }}
          >
            {category}
          </p>
          <PlayCircle className="h-4 w-4" style={{ color: "var(--muted)" }} />
        </div>
        <h3 className="mt-2 text-base font-semibold leading-6">{title}</h3>
      </div>
    </div>
  );
}