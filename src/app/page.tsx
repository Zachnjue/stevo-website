import Link from "next/link";
import Image from "next/image";
import ClientMarquee from "@/components/ClientMarquee";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";

// Hero mosaic. On desktop this is a 12-column, 2-row grid: the neon sign and
// the roll-up span both rows, the other four sit in pairs between them.
const HERO_WORK = [
  {
    image: "/images/catalogue/signage6.jpg",
    alt: "Red neon Uptown Lounge sign",
    label: "Neon signage",
    sizes: "(min-width: 1024px) 33vw, 100vw",
    cls: "col-span-2 aspect-[16/11] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
    pos: "center",
  },
  {
    image: "/images/catalogue/hoodie.jpg",
    alt: "Embroidered hoodies in yellow, grey and orange",
    label: "Embroidered hoodies",
    sizes: "(min-width: 1024px) 25vw, 50vw",
    cls: "aspect-[4/5] lg:col-span-3 lg:aspect-auto",
    pos: "50% 35%",
  },
  {
    image: "/images/catalogue/roll-up.jpg",
    alt: "Zero Malaria roll-up banner",
    label: "Roll-up banners",
    sizes: "(min-width: 1024px) 17vw, 50vw",
    cls: "aspect-[4/5] lg:col-span-2 lg:row-span-2 lg:aspect-auto",
    pos: "center",
  },
  {
    image: "/images/catalogue/umbrella2.jpg",
    alt: "White branded golf umbrella",
    label: "Branded umbrellas",
    sizes: "(min-width: 1024px) 25vw, 50vw",
    cls: "aspect-[4/5] lg:col-span-3 lg:aspect-auto",
    pos: "center",
  },
  {
    image: "/images/catalogue/jersey-bvb.jpg",
    alt: "Yellow football jersey on grass",
    label: "Custom jerseys",
    sizes: "(min-width: 1024px) 25vw, 50vw",
    cls: "aspect-[4/5] lg:col-span-3 lg:aspect-auto",
    pos: "center",
  },
  {
    image: "/images/catalogue/trophy-awards-2.jpg",
    alt: "Engraved glass service award",
    label: "Engraved awards",
    sizes: "(min-width: 1024px) 25vw, 100vw",
    cls: "col-span-2 aspect-[16/10] lg:col-span-3 lg:aspect-auto",
    pos: "50% 35%",
  },
];

const FEATURED_SERVICE = {
  index: "01",
  title: "Corporate Identity",
  desc: "Logos, brand collateral, signage, and printed materials that give your brand a consistent, iconic look across every touchpoint.",
  image: "/images/catalogue/signage4.jpg",
  // Tall photo in a wide tile: aim the crop at the Vivo sign and shopfront.
  position: "50% 37%",
};

const SERVICES = [
  {
    index: "02",
    title: "Staff Uniform",
    desc: "Company, chef, school, sports, safety, and corporate uniforms customized to your specifications.",
    image: "/images/catalogue/polo-tshirt2.jpg",
  },
  {
    index: "03",
    title: "Printing",
    desc: "Gift bags, banners, notebooks, and promotional material branding that demands attention.",
    image: "/images/catalogue/posters-fliers.jpg",
  },
];

// Kept off the main branding/printing line-up so it doesn't compete for
// visual weight — see the secondary strip below "What We Do".
const OFFICE_SUPPLIES = {
  title: "Office Supplies",
  desc: "Stationery, printers, photocopy paper, desktops, and general supplies for your workplace.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-brand-navy px-6 pb-16 pt-14 text-paper [--crop-color:var(--paper)] sm:px-10 sm:pb-24 sm:pt-20">
        <p className="eyebrow flex items-center gap-2 text-paper/80">
          <RegMark className="h-4 w-4" />
          Branding &amp; Printing · Nairobi
        </p>
        <h1 className="display-light mt-6 max-w-5xl text-6xl leading-[0.98] sm:text-7xl lg:text-8xl xl:text-9xl">
          Branding. Printing.
          <br />
          Merch.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/85">
          Everything your brand needs to show up professionally.
        </p>
        <p className="eyebrow mt-3 text-paper/60">Brands worth remembering.</p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Link
            href="/contact"
            className="eyebrow border border-paper bg-paper px-7 py-3.5 text-ink transition-colors hover:bg-transparent hover:text-paper"
          >
            Get a Quote
          </Link>
          <Link href="/catalogue" className="eyebrow link-reveal">
            View Our Work →
          </Link>
        </div>

        {/* Selected client work, laid out as an editorial mosaic */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:aspect-[12/5]">
          {HERO_WORK.map((w, i) => (
            <Reveal
              key={w.image}
              delay={i * 80}
              className={`crop-corners relative ${w.cls}`}
            >
              <Link
                href="/catalogue"
                className="group relative block h-full w-full overflow-hidden bg-paper-deep"
              >
                <Image
                  src={w.image}
                  alt={w.alt}
                  fill
                  priority={i < 3}
                  sizes={w.sizes}
                  style={{ objectPosition: w.pos }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pb-3 pt-12">
                  <p className="eyebrow text-paper">
                    <span className="text-paper/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    — {w.label}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="eyebrow text-paper/80">Selected work</p>
          <Link href="/catalogue" className="eyebrow link-reveal">
            View all work →
          </Link>
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-line bg-white py-12 sm:py-16">
        <p className="eyebrow mb-8 text-center text-ink-soft">
          Trusted by leading brands
        </p>
        <ClientMarquee />
      </section>

      {/* What we do */}
      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-accent">What We Do</p>
              <h2 className="display-light mt-3 text-5xl leading-[1.02] text-ink sm:text-7xl">
                Every touchpoint
                <br />
                of your brand.
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
                    alt="Illuminated Vivo shop sign being installed"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    style={{ objectPosition: FEATURED_SERVICE.position }}
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

            <div className="grid grid-rows-2 divide-y divide-line">
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

          {/* Office supplies — kept secondary, out of the main branding line-up */}
          <Reveal
            delay={160}
            className="mt-4 flex flex-col items-start justify-between gap-3 border border-line px-6 py-5 sm:flex-row sm:items-center"
          >
            <div>
              <p className="eyebrow text-ink-soft">Also available</p>
              <p className="mt-1 text-sm text-ink">
                <span className="font-display text-ink">{OFFICE_SUPPLIES.title}</span>
                {" — "}
                {OFFICE_SUPPLIES.desc}
              </p>
            </div>
            <Link href="/services" className="eyebrow link-reveal shrink-0 text-ink-soft">
              Learn more →
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
