import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Megaphone,
  Newspaper,
  Video,
  Handshake,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";

const enquiryTypes = [
  {
    icon: Megaphone,
    title: "Advertising Enquiries",
    desc: "Brand campaigns, sponsored stories, video promotions, local business visibility and media packages.",
  },
  {
    icon: Newspaper,
    title: "News & Editorial",
    desc: "Story leads, public-interest updates, local issues, press information and community coverage.",
  },
  {
    icon: Video,
    title: "Video & Event Coverage",
    desc: "Event coverage, interviews, launches, special programs, public events and digital video features.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    desc: "Strategic collaborations, institutional partnerships, community programs and long-term media associations.",
  },
];

export const metadata = {
  title: "Contact Metro TV Telugu",
  description:
    "Contact Metro TV Telugu for advertising, partnerships, news coverage, video promotions, events and business enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <div className="glass-strong rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill">Contact Metro TV Telugu</div>

                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Connect for news, advertising, partnerships and media enquiries
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Reach out to Metro TV Telugu for advertising opportunities, sponsored
                  content, event coverage, news inputs, video promotions, partnerships
                  and business enquiries.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/advertise" className="btn-primary">
                    Explore advertising
                  </Link>

                  <Link href="/videos" className="btn-secondary">
                    View video showcase
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div className="glass-strong rounded-3xl p-8 md:p-10">
                <SectionTitle
                  eyebrow="Send an Enquiry"
                  title="Tell us how you would like to connect"
                  desc="This form can later be connected to email, Google Sheets, CRM or WhatsApp depending on the final workflow."
                />

                <form className="mt-8 grid gap-5">
                  <input type="text" placeholder="Your Name" className="input" />
                  <input type="email" placeholder="Email Address" className="input" />
                  <input type="tel" placeholder="Phone / WhatsApp Number" className="input" />
                  <input type="text" placeholder="Company / Organisation" className="input" />

                  <select className="input" defaultValue="">
                    <option value="" disabled>
                      Select enquiry type
                    </option>
                    <option>Advertising / Sponsorship</option>
                    <option>News / Editorial</option>
                    <option>Event Coverage</option>
                    <option>Video Promotion</option>
                    <option>Partnership</option>
                    <option>General Enquiry</option>
                  </select>

                  <textarea
                    placeholder="Tell us about your requirement"
                    className="textarea"
                  />

                  <button type="button" className="btn-primary w-fit">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid gap-5">
                <div className="glass-strong rounded-3xl p-7">
                  <Mail className="h-8 w-8" style={{ color: "var(--gold)" }} />
                  <h3 className="mt-4 text-xl font-bold">Email</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                    Add official Metro TV Telugu email ID here.
                  </p>
                  <p className="mt-3 font-semibold">info@metrotvtelugu.com</p>
                </div>

                <div className="glass-strong rounded-3xl p-7">
                  <Phone className="h-8 w-8" style={{ color: "var(--gold)" }} />
                  <h3 className="mt-4 text-xl font-bold">Phone / WhatsApp</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                    Add official contact number for advertising and business enquiries.
                  </p>
                  <p className="mt-3 font-semibold">+91 00000 00000</p>
                </div>

                <div className="glass-strong rounded-3xl p-7">
                  <MapPin className="h-8 w-8" style={{ color: "var(--gold)" }} />
                  <h3 className="mt-4 text-xl font-bold">Office Address</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                    Add the official Metro TV Telugu office address here before final launch.
                  </p>
                  <p className="mt-3 font-semibold">Hyderabad, Telangana</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Enquiry Types"
              title="How Metro TV Telugu can help"
              desc="The contact page can support editorial, advertising, event, partnership and business conversations."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-4">
            {enquiryTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="glass-strong card-hover rounded-3xl p-6">
                    <Icon className="h-8 w-8" style={{ color: "var(--gold)" }} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}