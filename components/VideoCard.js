import { PlayCircle } from "lucide-react";

export default function VideoCard({ title, category, videoId }) {
  return (
    <div className="glass-strong card-hover rounded-[26px] p-4">
      <div className="embed-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
            {category}
          </p>
          <PlayCircle className="h-5 w-5" style={{ color: "var(--muted)" }} />
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-7">{title}</h3>
      </div>
    </div>
  );
}
