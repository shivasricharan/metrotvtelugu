import Link from "next/link";
import Image from "next/image";
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
  ExternalLink,
} from "lucide-react";
import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import ContactForm from "../../components/ContactForm";
import { getMetroCmsData } from "../../lib/metroCms";

export const dynamic = "force-dynamic";

const fallbackOfficeDetails = {
  addressLine1: "Metro TV Telugu",
  addressLine2: "603, Above Axis Bank, Maruthi Plaza, Khairathabad",
  cityState: "Hyderabad - 500004, Telangana",
  country: "India",
  phone: "+91 40-40159550",
  email: "admin@metrotvtelugu.com",
};

const fallbackSocialLinks = {
  instagramurl: "https://www.instagram.com/metrotv_telugu?igsh=MXoyNXY0YmY1YXZm",
  facebookurl: "https://www.facebook.com/share/1DipSWBgGs/?mibextid=wwXIfr",
  youtubechannelurl: "https://youtube.com/@metrotvtelugunews?si=Ma595RbHnX0Rn_yw",
};

const fallbackKeyContacts = [
  {
    name: "Mr. Rakesh Dasari",
    role: "Managing Director",
    phone: "+91 9490235700",
    email: "rakesh@metrotvtelugu.com",
    desc: "Leadership and overall business direction.",
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

function buildOfficeDetails(settings = {}) {
  const fullAddress = settings.officeaddress || settings.officeAddress || "";

  return {
    addressLine1: "Metro TV Telugu",
    addressLine2: fullAddress || fallbackOfficeDetails.addressLine2,
    cityState: fullAddress ? "" : fallbackOfficeDetails.cityState,
    country: fullAddress ? "" : fallbackOfficeDetails.country,
    phone:
      settings.mainphone ||
      settings.mainPhone ||
      fallbackOfficeDetails.phone,
    email:
      settings.mainemail ||
      settings.mainEmail ||
      fallbackOfficeDetails.email,
  };
}

function getSetting(settings, key, fallback) {
  return settings?.[key] || fallback;
}

function normalizeContact(contact) {
  return {
    name: contact.name || "Team Member",
    role: contact.role || "Team",
    phone: contact.phone || "",
    email: contact.email || "",
    desc:
      contact.description ||
      contact.desc ||
      "Official contact for communication and coordination.",
  };
}

function SocialImage({ src, alt }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className="object-contain"
      />
    </span>
  );
}

export default async function ContactPage() {
  const cmsData = await getMetroCmsData("all");

  const settings = cmsData?.settings || {};
  const cmsContacts = Array.isArray(cmsData?.contacts) ? cmsData.contacts : [];

  const officeDetails = buildOfficeDetails(settings);

  const instagramUrl = getSetting(
    settings,
    "instagramurl",
    fallbackSocialLinks.instagramurl
  );

  const facebookUrl = getSetting(
    settings,
    "facebookurl",
    fallbackSocialLinks.facebookurl
  );

  const youtubeUrl = getSetting(
    settings,
    "youtubechannelurl",
    fallbackSocialLinks.youtubechannelurl
  );

  const keyContacts =
    cmsContacts.length > 0
      ? cmsContacts.map(normalizeContact)
      : fallbackKeyContacts;

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
                  Reach out for news communication, editorial coordination, advertising
                  opportunities, sponsored content, event coverage, partnerships and
                  business enquiries.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/advertise" className="btn-primary">
                    Explore advertising
                  </Link>

                  <Link href="/videos" className="btn-secondary">
                    View video showcase
                  </Link>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <SocialImage src="/instagram.png" alt="Instagram" />
                    Instagram
                  </a>

                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <SocialImage src="/facebook.png" alt="Facebook" />
                    Facebook
                  </a>
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
              title="Official contact details"
              desc="Address, phone, email and social links for viewers, partners, advertisers and organisations."
            />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-4">
            <FadeIn>
              <div className="glass-strong h-full rounded-3xl p-7">
                <Building2 className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Office Address</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Visit or contact the team at the official office address.
                </p>

                <p className="mt-3 font-semibold leading-7">
                  {officeDetails.addressLine1}
                  <br />
                  {officeDetails.addressLine2}
                  {officeDetails.cityState ? (
                    <>
                      <br />
                      {officeDetails.cityState}
                    </>
                  ) : null}
                  {officeDetails.country ? (
                    <>
                      <br />
                      {officeDetails.country}
                    </>
                  ) : null}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="glass-strong h-full rounded-3xl p-7">
                <Phone className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Phone / WhatsApp</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Main contact number for general, advertising and business enquiries.
                </p>

                <p className="mt-3 font-semibold">{officeDetails.phone}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="glass-strong h-full rounded-3xl p-7">
                <Mail className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Email</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Official email ID for communication and coordination.
                </p>

                <p className="mt-3 font-semibold whitespace-nowrap text-sm md:text-base">
                  {officeDetails.email}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="glass-strong h-full rounded-3xl p-7">
                <Video className="h-8 w-8" style={{ color: "var(--gold)" }} />

                <h3 className="mt-4 text-xl font-bold">Follow Online</h3>

                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  Follow updates, videos, Shorts and social posts across digital platforms.
                </p>

                <div className="mt-5 grid gap-3">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary justify-start text-sm"
                  >
                    <SocialImage src="/instagram.png" alt="Instagram" />
                    Instagram
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>

                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary justify-start text-sm"
                  >
                    <SocialImage src="/facebook.png" alt="Facebook" />
                    Facebook
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary justify-start text-sm"
                  >
                    <Video className="h-4 w-4" />
                    YouTube
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>
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
              eyebrow="Key Contacts"
              title="Leadership and editorial contacts"
              desc="Connect with the official leadership and editorial team for organisational, business, editorial and partnership communication."
              center={true}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {keyContacts.map((contact, index) => (
              <FadeIn key={`${contact.role}-${contact.email}-${index}`} delay={index * 0.08}>
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
                    {contact.phone ? (
                      <div className="flex items-start gap-2">
                        <Phone
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--gold)" }}
                        />
                        <span className="leading-6">{contact.phone}</span>
                      </div>
                    ) : null}

                    {contact.email ? (
                      <div className="flex min-w-0 items-start gap-2">
                        <Mail
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--gold)" }}
                        />
                        <span className="min-w-0 whitespace-nowrap text-[13px] leading-6 md:text-sm">
                          {contact.email}
                        </span>
                      </div>
                    ) : null}
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
                  The contact page supports communication across news inputs, editorial
                  coordination, advertising, partnerships, event coverage and business
                  enquiries.
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
              title="How the team can help"
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