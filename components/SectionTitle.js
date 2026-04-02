export default function SectionTitle({ eyebrow, title, desc, center = false }) {
  return (
    <div className={center ? "mb-10 text-center" : "mb-10"}>
      {eyebrow && <p className="badge-pill mb-4">{eyebrow}</p>}
      <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
      {desc && (
        <p className={`mt-4 max-w-2xl ${center ? "mx-auto" : ""}`} style={{ color: "var(--muted)" }}>
          {desc}
        </p>
      )}
    </div>
  );
}
