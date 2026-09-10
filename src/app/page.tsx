import Link from "next/link";
import Image from "next/image";
import ClientMarquee from "@/components/ClientMarquee";
import VisionMissionValues from "@/components/VisionMissionValues";
import Reveal from "@/components/Reveal";
import TornDivider from "@/components/TornDivider";
import RegMark from "@/components/RegMark";
import InkDots from "@/components/InkDots";
import Misprint from "@/components/Misprint";

const FEATURED_SERVICE = {
  title: "Corporate Identity",
  desc: "Logos, brand collateral, signage, and printed materials that give your brand a consistent, iconic look across every touchpoint.",
  image: "/images/roll-up-banner.jpg",
};

const SERVICES = [
  {
    title: "Staff Uniform",
    desc: "Company, chef, school, sports, safety, and corporate uniforms customized to your specifications.",
    image: "/images/chef-uniform.jpg",
  },
  {
    title: "Printing",
    desc: "Gift bags, banners, notebooks, and promotional material branding that demands attention.",
    image: "/images/gift-bags.jpg",
  },
  {
    title: "Office Equipment",
    desc: "Stationery, printers, photocopy paper, desktops, and general supplies for your workplace.",
    image: "/images/office-supplies.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-black">
        <Image
          src="/images/printing-press.jpg"
          alt="Printing press running a large print job"
          fill
          priority
          className="object-cover opacity-40"
        />
        <InkDots className="absolute -top-4 right-6 hidden sm:block" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              <RegMark className="h-4 w-4" color="currentColor" />
              Ink is our underlying foundation
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              <Misprint>Branding &amp; Printing</Misprint> that make brands{" "}
              <span className="text-brand-blue">iconic.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Thee Printing Hub is a vibrant, dynamic below-the-line company
              helping brands reach iconic status with materials that stand
              out and demand attention.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-brand-pink px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg"
              >
                Get a Quote
              </Link>
              <Link
                href="/catalogue"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                View Catalogue
              </Link>
            </div>
          </div>

          <div className="crop-corners relative h-64 w-full rounded-3xl sm:h-80">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <Image
                src="/images/branded-apparel.jpg"
                alt="Stack of folded branded apparel"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-6 shadow-lg">
              <p className="text-sm font-semibold text-brand-black">
                Trusted by 15+ leading brands
              </p>
              <p className="mt-1 text-xs text-black/60">
                Gift bags · Uniforms · Corporate identity · Promotional merch
              </p>
            </div>
          </div>
        </div>
        <TornDivider
          color="var(--brand-blue)"
          className="absolute bottom-0 left-0"
        />
      </section>

      {/* What we do */}
      <section className="relative overflow-hidden bg-brand-blue py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-3xl font-bold">What We Do</h2>
            <p className="mt-2 max-w-2xl text-white/85">
              From office equipment to staff uniforms, general supplies to
              full corporate identity — we cover every touchpoint of your
              brand.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
            <Reveal className="crop-corners relative lg:col-span-2 lg:row-span-2">
              <Link
                href="/services"
                className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={FEATURED_SERVICE.image}
                  alt={FEATURED_SERVICE.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative p-8">
                  <span className="inline-block rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-black">
                    Featured
                  </span>
                  <h3 className="mt-4 text-2xl font-bold">
                    {FEATURED_SERVICE.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/85">
                    {FEATURED_SERVICE.desc}
                  </p>
                </div>
              </Link>
            </Reveal>

            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="crop-corners relative">
                <div className="group relative flex h-full min-h-[150px] flex-col justify-end overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative p-5">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/services"
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-blue-dark transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
            >
              Explore All Services
            </Link>
          </Reveal>
        </div>
        <TornDivider color="#fafafa" className="absolute bottom-0 left-0" />
      </section>

      {/* Vision / Mission / Values */}
      <section className="relative overflow-hidden bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <VisionMissionValues />
          </Reveal>
        </div>
        <TornDivider color="#ffffff" className="absolute bottom-0 left-0" />
      </section>

      {/* Clients */}
      <section className="relative overflow-hidden bg-dot-grid bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-brand-black">
              Trusted by Leading Brands
            </h2>
          </Reveal>
        </div>
        <div className="mt-8">
          <ClientMarquee />
        </div>
        <TornDivider
          color="var(--brand-pink)"
          className="absolute bottom-0 left-0"
        />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-pink py-14 text-center text-white">
        <Image
          src="/images/school-uniform.jpg"
          alt="Students in branded school uniforms"
          fill
          className="object-cover opacity-25"
        />
        <Reveal className="relative mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">
            Ready to give your brand an iconic look?
          </h2>
          <p className="mt-3 text-white/90">
            Talk to us about your next print run, uniform order, or branding
            campaign.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-pink transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </Reveal>
        <TornDivider color="#17181a" className="absolute bottom-0 left-0" />
      </section>
    </div>
  );
}
