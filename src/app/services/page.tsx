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
    image: "/images/catalogue/notebooks.jpg",
    desc: "We are dedicated to supplying high quality office equipment that meets the required business standards.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "02",
    title: "Staff Uniform",
    image: "/images/catalogue/polo-tshirt2.jpg",
    desc: "We offer a wide range of staff uniforms customized to your specifications.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "03",
    title: "General Supplies & Printing",
    image: "/images/catalogue/umbrella2.jpg",
    desc: "Gift bags, banners, notebooks, bottles, caps, mugs, and promotional material branding that demands attention.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
  {
    index: "04",
    title: "Corporate Identity",
    image: "/images/catalogue/roll-up.jpg",
    desc: "Consistent, iconic branding collateral across every touchpoint of your business.",
    seeMore: "Browse the catalogue",
    seeMoreHref: "/catalogue",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="grid bg-brand-blue-deep text-white md:grid-cols-[1fr_1.1fr]">
        <div className="crop-corners relative min-h-[280px] md:min-h-[440px] md:order-2">
          <Image
            src="/images/catalogue/caps2.jpg"
            alt="Rows of blue branded caps laid out on a Thee Printing Hub banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 md:order-1">
          <p className="eyebrow flex items-center gap-2 text-white/85">
            <RegMark className="h-4 w-4" />
            What We Do
          </p>
          <h1 className="display-light mt-6 text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">
            Our services.
          </h1>
          <ul className="mt-8 max-w-sm border-t border-white/25">
            {SECTIONS.map((s) => (
              <li
                key={s.title}
                className="flex items-baseline gap-4 border-b border-white/25 py-3"
              >
                <span className="font-display text-xs text-brand-yellow">
                  {s.index}
                </span>
                <span className="font-display text-lg">
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
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-paper-deep">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-display text-sm text-accent">
                    {s.index}
                  </span>
                  <h2 className="display-light mt-1 text-3xl text-ink">
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
