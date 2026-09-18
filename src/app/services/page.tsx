import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import RegMark from "@/components/RegMark";

export const metadata: Metadata = {
  title: "Services | Thee Printing Hub",
  description:
    "Office equipment, staff uniforms, general supplies, printing, and corporate identity services from Thee Printing Hub.",
};

const SECTIONS = [
  {
    index: "01",
    title: "Office Equipment",
    image: "/images/office/office-stationery.png",
    desc: "We are dedicated to supplying high quality office equipment that meets the required business standards.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "02",
    title: "Staff Uniform",
    image: "/images/uniforms/uniform-chef-attire.png",
    desc: "We offer a wide range of staff uniforms customized to your specifications.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "03",
    title: "General Supplies & Printing",
    image: "/images/gift-bags.jpg",
    desc: "Gift bags, banners, notebooks, bottles, caps, mugs, and promotional material branding that demands attention.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "04",
    title: "Corporate Identity",
    image: "/images/roll-up-banner.jpg",
    desc: "Consistent, iconic branding collateral across every touchpoint of your business.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="grid border-b border-line md:grid-cols-[1fr_1.1fr]">
        <div className="crop-corners relative min-h-[280px] md:min-h-0 md:order-2">
          <Image
            src="/images/branded-apparel.jpg"
            alt="Branded apparel"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 md:order-1">
          <p className="eyebrow flex items-center gap-2 text-ink-soft">
            <RegMark className="h-4 w-4 text-brand-blue" />
            What We Do
          </p>
          <h1 className="font-display mt-4 text-5xl leading-tight text-ink sm:text-6xl">
            Our Services
          </h1>
          <ul className="mt-8 max-w-sm border-t border-line">
            {SECTIONS.map((s) => (
              <li
                key={s.title}
                className="flex items-baseline gap-4 border-b border-line py-3"
              >
                <span className="font-display text-xs text-accent">
                  {s.index}
                </span>
                <span className="font-display text-lg text-ink">
                  {s.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 sm:gap-10">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="grid h-full grid-cols-[auto_1fr] gap-6 border border-line p-8">
                <div className="relative h-24 w-24 shrink-0 bg-paper-deep">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <div>
                  <span className="font-display text-sm text-accent">
                    {s.index}
                  </span>
                  <h2 className="font-display mt-1 text-2xl text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">{s.desc}</p>
                  <Link
                    href={s.seeMoreHref}
                    className="eyebrow link-reveal mt-4 inline-block text-accent"
                  >
                    {s.seeMore}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
