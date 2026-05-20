"use client";

export default function SocialBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          "44px",
        height:         "44px",
        borderRadius:   "10px",
        background:     "rgba(255,255,255,0.08)",
        border:         "1px solid rgba(255,255,255,0.15)",
        transition:     "background 0.2s, border-color 0.2s",
        flexShrink:     0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background  = "rgba(232,0,29,0.20)";
        e.currentTarget.style.borderColor = "rgba(232,0,29,0.50)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background  = "rgba(255,255,255,0.08)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
      }}
    >
      {children}
    </a>
  );
}
