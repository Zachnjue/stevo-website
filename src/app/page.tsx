import Link from "next/link";
import Image from "next/image";
import ClientMarquee from "@/components/ClientMarquee";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";

const FEATURED_SERVICE = {
  index: "01",
  title: "Corporate Identity",
  desc: "Logos, brand collateral, signage, and printed materials that give your brand a consistent, iconic look across every touchpoint.",
  image: "/images/roll-up-banner.jpg",
};

const SERVICES = [
  {
    index: "02",
    title: "Staff Uniform",
    desc: "Company, chef, school, sports, safety, and corporate uniforms customized to your specifications.",
    image: "/images/chef-uniform.jpg",
  },
  {
    index: "03",
    title: "Printing",
    desc: "Gift bags, banners, notebooks, and promotional material branding that demands attention.",
    image: "/images/gift-bags.jpg",
  },
  {
    index: "04",
    title: "Office Equipment",
    desc: "Stationery, printers, photocopy paper, desktops, and general supplies for your workplace.",
    image: "/images/office-supplies.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 lg:py-32">
          <p className="eyebrow flex items-center gap-2 text-ink-soft">
            <RegMark className="h-4 w-4 text-brand-blue" />
            Ink is our underlying foundation
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Branding &amp;
            <br />
            Printing that
            <br />
            make brands{" "}
            <span className="text-brand-blue">iconic.</span>
          </h1>
          <p className="mt-8 max-w-md text-ink-soft">
            A vibrant, below-the-line branding and printing company —
            we formulate traction and create materials that stand out and
            demand attention.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="eyebrow border border-ink px-7 py-3.5 text-ink transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white"
            >
              Get a Quote
            </Link>
            <Link href="/catalogue" className="eyebrow link-reveal text-ink">
              View Catalogue →
            </Link>
          </div>
        </div>

        <div className="crop-corners relative min-h-[320px] md:min-h-0">
          <Image
            src="/images/printing-press.jpg"
            alt="Printing press running a large print job"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-accent">What We Do</p>
              <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
                Every Touchpoint
                <br />
                of Your Brand
              </h2>
            </div>
            <Link href="/services" className="eyebrow link-reveal shrink-0 text-ink">
              Explore All Services →
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-px border border-line lg:grid-cols-2">
            <Reveal className="crop-corners group relative border-b border-line lg:border-b-0 lg:border-r">
              <Link href="/services" className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={FEATURED_SERVICE.image}
                    alt={FEATURED_SERVICE.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <span className="font-display text-sm text-accent">
                    {FEATURED_SERVICE.index}
                  </span>
                  <h3 className="font-display mt-2 text-2xl text-ink">
                    {FEATURED_SERVICE.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-ink-soft">
                    {FEATURED_SERVICE.desc}
                  </p>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-rows-3 divide-y divide-line">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className="crop-corners group relative">
                  <Link href="/services" className="flex h-full items-center gap-6 p-6">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="font-display text-sm text-accent">
                        {s.index}
                      </span>
                      <h3 className="font-display mt-1 text-xl text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1 max-w-md text-sm text-ink-soft">
                        {s.desc}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <p className="eyebrow text-center text-ink-soft">
              Trusted by Leading Brands
            </p>
          </Reveal>
        </div>
        <div className="mt-10">
          <ClientMarquee />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src="/images/branded-apparel.jpg"
            alt="Stack of folded branded apparel"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <Reveal className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-paper">
            <h2 className="font-display max-w-2xl text-4xl leading-tight sm:text-5xl">
              Ready to give your brand an iconic look?
            </h2>
            <p className="mt-4 max-w-md text-paper/80">
              Talk to us about your next print run, uniform order, or
              branding campaign.
            </p>
            <Link
              href="/contact"
              className="eyebrow mt-8 border border-brand-yellow px-8 py-3.5 text-paper transition-colors hover:bg-brand-yellow hover:text-ink"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
