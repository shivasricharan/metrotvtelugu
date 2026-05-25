import Link from "next/link";
import Image from "next/image";
import {
  Mail, Phone, MapPin, Megaphone, Newspaper,
  Video, Handshake, Building2, UserRound, ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import ContactForm from "../../components/ContactForm";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackOffice = {
  addressLine1: "Metro TV Telugu",
  addressLine2: "603, Above Axis Bank, Maruthi Plaza, Khairathabad",
  cityState:    "Hyderabad - 500004, Telangana",
  country:      "India",
  phone:        "+91 40-40159550",
  email:        "admin@metrotvtelugu.com",
};

const fallbackSocial = {
  instagramurl:     "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm",
  facebookurl:      "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr",
  youtubechannelurl:"https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
};

const fallbackContacts = [
  { name: "Mr. Rakesh Dasari",           role: "Managing Director", phone: "+91 40-40159550", mobile: "+91 9490235700",  email: "rakesh@metrotvtelugu.com",        desc: "Leadership and overall business direction." },
  { name: "Mr. Kondaveeti Jayaprasad",   role: "Chief Editor",      phone: "+91 40-40159550", mobile: "+91 9848038375",  email: "admin@metrotvtelugu.com",          desc: "Editorial leadership, news direction and content oversight." },
  { name: "Mr. B. Chandrasekhar",        role: "Editor",            phone: "+91 40-40159550", mobile: "+91 9963996704",  email: "chandrasekhar@metrotvtelugu.com",  desc: "Editorial coordination, news inputs and content-related communication." },
  { name: "Mr. Sagar Pragnapuram",       role: "CEO",               phone: "+91 40-40159550", mobile: "+91 8790739192",  email: "sagar@metrotvtelugu.com",          desc: "Business operations, partnerships, growth and strategic enquiries." },
];

const enquiryTypes = [
  { icon: Megaphone,  title: "Advertising Enquiries", desc: "Brand campaigns, sponsored stories, video promotions, local business visibility and media packages." },
  { icon: Newspaper,  title: "News & Editorial",      desc: "Story leads, public-interest updates, local issues, press information and community coverage." },
  { icon: Video,      title: "Video & Event Coverage",desc: "Event coverage, interviews, launches, special programs, public events and digital video features." },
  { icon: Handshake,  title: "Partnerships",          desc: "Strategic collaborations, institutional partnerships, community programs and long-term media associations." },
];

function buildOffice(settings = {}) {
  const fullAddress = settings.officeaddress || settings.officeAddress || "";
  return {
    addressLine1: "Metro TV Telugu",
    addressLine2: fullAddress || fallbackOffice.addressLine2,
    cityState:    fullAddress ? "" : fallbackOffice.cityState,
    country:      fullAddress ? "" : fallbackOffice.country,
    phone:        settings.mainphone || settings.mainPhone || fallbackOffice.phone,
    email:        settings.mainemail || settings.mainEmail || fallbackOffice.email,
  };
}

function get(settings, key, fallback) { return settings?.[key] || fallback; }

function normalizeContact(c) {
  return {
    name:   c.name   || "Team Member",
    role:   c.role   || "Team",
    phone:  c.phone  || "",
    mobile: c.mobile || c.mobileNumber || c.mobileNo || "",
    email:  c.email  || "",
    desc:   c.description || c.desc || "Official contact for communication and coordination.",
  };
}

function SocialImage({ src, alt }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <Image src={src} alt={alt} width={20} height={20} className="object-contain" />
    </span>
  );
}

export const metadata = {
  title: "Contact Metro TV Telugu",
  description: "Contact Metro TV Telugu for advertising, partnerships, news coverage, video promotions, events and business enquiries.",
};

export default async function ContactPage() {
  const cmsData    = await getMetroCmsData("all");
  const settings   = cmsData?.settings || {};
  const cmsContacts= Array.isArray(cmsData?.contacts) ? cmsData.contacts : [];

  const office       = buildOffice(settings);
  const instagramUrl = get(settings, "instagramurl",     fallbackSocial.instagramurl);
  const facebookUrl  = get(settings, "facebookurl",      fallbackSocial.facebookurl);
  const youtubeUrl   = get(settings, "youtubechannelurl",fallbackSocial.youtubechannelurl);
  const keyContacts  = cmsContacts.length > 0 ? cmsContacts.map(normalizeContact) : fallbackContacts;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-space" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <FadeIn>
            <div className="hero-panel rounded-3xl p-8 md:p-14">
              <div className="max-w-4xl">
                <div className="badge-pill mb-6">Contact Metro TV Telugu</div>
                <h1 className="text-4xl font-black leading-tight md:text-6xl" style={{ lineHeight: 1.1 }}>
                  Connect with<br />
                  <span style={{ color: "var(--red)" }}>Metro TV Telugu</span>
                </h1>
                <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
                  Reach out for advertising opportunities, sponsored content, event
                  coverage, partnerships and business enquiries.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/advertise" className="btn-primary">Explore advertising</Link>
                  <Link href="/videos"    className="btn-secondary">View video showcase</Link>
                  <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-secondary" aria-label="Instagram">
                    <SocialImage src="/instagram.png" alt="Instagram" />
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noreferrer" className="btn-secondary" aria-label="Facebook">
                    <SocialImage src="/facebook.png" alt="Facebook" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── OFFICE DETAILS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Office & Main Contact"
              title="Official contact details"
              desc="Address, phone, email and social links for viewers, partners, advertisers and organisations."
            />
          </FadeIn>

          <div className="grid gap-5 lg:grid-cols-4">
            {/* Address */}
            <FadeIn>
              <div className="card-hover h-full rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(232,0,29,0.10)" }}>
                  <Building2 className="h-5 w-5" style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-bold">Office Address</h3>
                <p className="mt-3 text-sm leading-7 font-semibold">
                  {office.addressLine1}<br />
                  {office.addressLine2}
                  {office.cityState ? <><br />{office.cityState}</> : null}
                  {office.country   ? <><br />{office.country}</> : null}
                </p>
              </div>
            </FadeIn>

            {/* Phone */}
            <FadeIn delay={0.08}>
              <div className="card-hover h-full rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(232,0,29,0.10)" }}>
                  <Phone className="h-5 w-5" style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-bold">Phone / WhatsApp</h3>
                <p className="mt-2 text-xs leading-6" style={{ color: "var(--muted)" }}>Main contact for general, advertising and business enquiries.</p>
                <p className="mt-3 font-bold" style={{ color: "var(--text)" }}>{office.phone}</p>
              </div>
            </FadeIn>

            {/* Email */}
            <FadeIn delay={0.16}>
              <div className="card-hover h-full rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(232,0,29,0.10)" }}>
                  <Mail className="h-5 w-5" style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-bold">Email</h3>
                <p className="mt-2 text-xs leading-6" style={{ color: "var(--muted)" }}>Official email for communication and coordination.</p>
                <p className="mt-3 text-sm font-bold break-all" style={{ color: "var(--text)" }}>{office.email}</p>
              </div>
            </FadeIn>

            {/* Social */}
            <FadeIn delay={0.24}>
              <div className="card-hover h-full rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(232,0,29,0.10)" }}>
                  <Video className="h-5 w-5" style={{ color: "var(--red)" }} />
                </div>
                <h3 className="font-bold">Follow Online</h3>
                <p className="mt-2 text-xs leading-6" style={{ color: "var(--muted)" }}>Follow videos, Shorts and updates across platforms.</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={instagramUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
                    style={{ background: "rgba(225,48,108,0.10)", border: "1px solid rgba(225,48,108,0.25)", textDecoration: "none" }}
                  >
                    <Image src="/instagram.png" alt="Instagram" width={40} height={40} className="object-contain flex-shrink-0" />
                    <div>
                      <div className="text-sm font-black" style={{ color: "var(--text)" }}>Instagram</div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>@metrotv_telugu</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0" style={{ color: "var(--muted)" }} />
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
                    style={{ background: "rgba(24,119,242,0.10)", border: "1px solid rgba(24,119,242,0.25)", textDecoration: "none" }}
                  >
                    <Image src="/facebook.png" alt="Facebook" width={40} height={40} className="object-contain flex-shrink-0" />
                    <div>
                      <div className="text-sm font-black" style={{ color: "var(--text)" }}>Facebook</div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>Metro TV Telugu</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0" style={{ color: "var(--muted)" }} />
                  </a>
                  <a href={youtubeUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
                    style={{ background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.20)", textDecoration: "none" }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0" style={{ background: "#ff0000" }}>
                      <Video className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <div className="text-sm font-black" style={{ color: "var(--text)" }}>YouTube</div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>@metrotvtelugunews</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0" style={{ color: "var(--muted)" }} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── KEY CONTACTS ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Key Contacts"
              title="Leadership and editorial contacts"
              desc="Connect with the official leadership and editorial team for organisational, business, editorial and partnership communication."
              center={true}
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2">
            {keyContacts.map((contact, i) => (
              <FadeIn key={`${contact.role}-${i}`} delay={i * 0.08}>
                <div
                  className="card-hover rounded-2xl p-6"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <UserRound className="h-6 w-6" style={{ color: "var(--red)" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--red)" }}>
                        {contact.role}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{contact.name}</h3>
                      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{contact.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm">
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                        <span className="text-xs" style={{ color: "var(--muted)" }}>Landline:</span>
                        <span>{contact.phone}</span>
                      </div>
                    )}
                    {contact.mobile && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                        <span className="text-xs" style={{ color: "var(--muted)" }}>Mobile:</span>
                        <span>{contact.mobile}</span>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--red)" }} />
                        <span className="truncate text-xs">{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FORM + SIDEBAR ── */}
      <section className="section-space">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-red)" }}
              >
                <SectionTitle
                  eyebrow="Send an Enquiry"
                  title="Tell us how you would like to connect"
                  desc="Submit advertising, editorial, event, partnership or business enquiries. Continues as a structured WhatsApp conversation."
                />
                <ContactForm />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(232,0,29,0.10)" }}
                >
                  <MapPin className="h-6 w-6" style={{ color: "var(--red)" }} />
                </div>
                <h2 className="text-2xl font-black leading-tight">Reach the right team faster</h2>
                <p className="mt-4 leading-7" style={{ color: "var(--muted)" }}>
                  The contact page supports communication across advertising, partnerships,
                  event coverage and business enquiries.
                </p>
                <div className="mt-6 grid gap-3">
                  {[
                    { title: "For advertisers",             body: "Sponsored content, brand visibility, video promotions and media campaigns." },
                    { title: "For editorial communication", body: "Public-interest stories, news inputs, press information and community updates." },
                    { title: "For events and partnerships", body: "Event coverage, interviews, collaborations and institutional partnerships." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl p-4"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <h3 className="text-sm font-bold" style={{ color: "var(--red)" }}>{item.title}</h3>
                      <p className="mt-1 text-sm leading-6" style={{ color: "var(--muted)" }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ENQUIRY TYPES ── */}
      <section className="section-space">
        <div className="container">
          <FadeIn>
            <SectionTitle
              eyebrow="Enquiry Types"
              title="How the team can help"
              desc="The contact page supports editorial, advertising, event, partnership and business conversations."
              center={true}
            />
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-4">
            {enquiryTypes.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div
                    className="card-hover rounded-2xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div
                      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(232,0,29,0.10)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--red)" }} />
                    </div>
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{item.desc}</p>
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