import FadeIn from "../../components/FadeIn";

export default function ContactPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-3xl glass-strong rounded-3xl p-8 md:p-10">
            <div className="badge-pill">Contact</div>

            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              Let us discuss the Metro TV Telugu website revamp
            </h1>

            <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
              This demo can be expanded into a full digital media platform with richer
              page systems, deeper content presentation, advertiser-led sections and
              production-ready workflows.
            </p>

            <div className="mt-8 grid gap-5">
              <input type="text" placeholder="Your Name" className="input" />
              <input type="email" placeholder="Email Address" className="input" />
              <input type="text" placeholder="Company or Team" className="input" />
              <textarea
                placeholder="Tell us what you want to build"
                className="textarea"
              />
              <button type="button" className="btn-primary w-fit">
                Send Enquiry
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}