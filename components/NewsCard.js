import { ArrowRight } from "lucide-react";

export default function NewsCard({ category, title, excerpt }) {
  return (
    <div className="glass-strong card-hover rounded-[26px] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--red)" }}>
        {category}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-8">{title}</h3>
      <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
        {excerpt}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
        Explore Story <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
