import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Megaphone,
  Newspaper,
  Video,
  Handshake,
  Building2,
  UserRound,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import ContactForm from "../../components/ContactForm";

const officeDetails = {
  addressLine1: "Metro TV Telugu",
  addressLine2: "603, Above Axis Bank, Maruthi Plaza, Khairathabad",
  cityState: "Hyderabad - 500004, Telangana",
  country: "India",
  phone: "+91 40-40159550",
  email: "admin@metrotvtelugu.com",
};

const keyContacts = [
  {
    name: "Mr. Rakesh Dasari",
    role: "Managing Director",
    phone: "+91 9490235700",
    email: "rakesh@metrotvtelugu.com",
    desc: "Leadership and overall business direction for Metro TV Telugu.",
  },
  {
    name: "Mr. Kondaveeti Jayaprasad",
    role: "Chief Editor",
    phone: "+91 9848038375 / 9248734566",
    email: "admin@metrotvtelugu.com",
    desc: "Editorial leadership, news direction and content oversight.",
  },
  {
    name: "Mr. B. Chandrasekhar",
    role: "Editor",
    phone: "+91 9963996704",
    email: "chandrasekhar@metrotvtelugu.com",
    desc: "Editorial coordination, news inputs and content-related communication.",
  },
  {
    name: "Mr. Sagar Pragnapuram",
    role: "CEO",
    phone: "+91 8790739192",
    email: "sagar@metrotvtelugu.com",
    desc: "Business operations, partnerships, growth and strategic enquiries.",
  },
];

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
                  Connect with Metro TV Telugu
                </h1>

                <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Reach out to Metro TV Telugu for news communication, editorial
                  coordination, advertising opportunities, sponsored content, event
                  coverage, partnerships and business enquiries.
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
          <FadeIn>
            <SectionTitle
              eyebrow="Office & Main Contact"
              title="Metro TV Telugu contact details"
              desc="Official address and general contact information for Metro TV Telugu."
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            <FadeIn>
              <div className="glass-strong rounded-3xl p-7">
                <Building2 className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Office Address</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Visit or contact Metro TV Telugu at the official office address.
                </p>

                <p className="mt-3 font-semibold leading-7">
                  {officeDetails.addressLine1}
                  <br />
                  {officeDetails.addressLine2}
                  <br />
                  {officeDetails.cityState}
                  <br />
                  {officeDetails.country}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="glass-strong rounded-3xl p-7">
                <Phone className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Phone / WhatsApp</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Main contact number for general, advertising and business enquiries.
                </p>

                <p className="mt-3 font-semibold">{officeDetails.phone}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="glass-strong rounded-3xl p-7">
                <Mail className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Email</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Official email ID for Metro TV Telugu communication.
                </p>

                <p className="mt-3 font-semibold whitespace-nowrap text-sm md:text-base">
                  {officeDetails.email}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Key Contacts"
              title="Metro TV Telugu leadership contacts"
              desc="Connect with the official leadership and editorial team for organisational, business, editorial and partnership communication."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {keyContacts.map((contact, index) => (
              <FadeIn key={contact.role} delay={index * 0.08}>
                <div className="glass-strong card-hover rounded-3xl p-7">
                  <UserRound className="h-8 w-8" style={{ color: "var(--gold)" }} />

                  <p
                    className="mt-4 text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: "var(--gold)" }}
                  >
                    {contact.role}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {contact.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                    {contact.desc}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Phone
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--gold)" }}
                      />
                      <span className="leading-6">{contact.phone}</span>
                    </div>

                    <div className="flex min-w-0 items-start gap-2">
                      <Mail
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--gold)" }}
                      />
                      <span className="min-w-0 whitespace-nowrap text-[13px] leading-6 md:text-sm">
                        {contact.email}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
                  desc="Submit advertising, editorial, event, partnership or business enquiries. The enquiry can be saved and continued as a structured WhatsApp conversation."
                />

                <ContactForm />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="glass-strong rounded-3xl p-8 md:p-10">
                <MapPin className="h-10 w-10" style={{ color: "var(--gold)" }} />

                <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                  Reach the right team faster
                </h2>

                <p className="mt-5 leading-8" style={{ color: "var(--muted)" }}>
                  Metro TV Telugu receives communication across multiple areas including
                  news inputs, editorial coordination, advertising, partnerships, event
                  coverage and business enquiries. The contact page gives viewers,
                  advertisers, partners and organisations a clear way to connect.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold">For advertisers</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Use the form for sponsored content, brand visibility, video
                      promotions and media campaigns.
                    </p>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold">For editorial communication</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Share public-interest stories, news inputs, press information,
                      local issues and community updates.
                    </p>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold">For events and partnerships</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                      Connect for event coverage, interviews, collaborations and
                      institutional partnerships.
                    </p>
                  </div>
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
              desc="The contact page supports editorial, advertising, event, partnership and business conversations."
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