import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PhotoMasonry from "@/components/PhotoMasonry";
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
    items: [
      "Office Stationeries",
      "Printers",
      "Photocopy Papers",
      "Gift Sets",
      "Notebooks",
      "Sticky Notes",
      "Computer Desktops",
    ],
  },
  {
    index: "02",
    title: "Staff Uniform",
    image: "/images/uniforms/uniform-chef-attire.png",
    desc: "We offer a wide range of staff uniforms customized to your specifications.",
    items: [
      "Company Staff Uniforms",
      "Chef Attire",
      "School Uniforms",
      "Sports Uniforms",
      "Sport Shoes",
      "Safety Apparel",
      "Corporate Uniforms",
      "Nurse Staff Uniforms",
    ],
  },
  {
    index: "03",
    title: "General Supplies & Printing",
    image: "/images/gift-bags.jpg",
    desc: "Gift bags, banners, notebooks, bottles, caps, mugs, and promotional material branding that demands attention.",
    items: [
      "Gift Bags",
      "Promotional Merchandise",
      "Branded Notebooks & Diaries",
      "Banners & Roll-up Stands",
      "Branded Apparel & Caps",
      "Branded Bottles & Mugs",
    ],
  },
  {
    index: "04",
    title: "Corporate Identity",
    image: "/images/roll-up-banner.jpg",
    desc: "Consistent, iconic branding collateral across every touchpoint of your business.",
    items: [
      "Logo & Brand Collateral",
      "Business Cards & Stationery",
      "Signage",
      "Vehicle Branding",
    ],
  },
];

const OFFICE_ITEMS = [
  { name: "Office Stationery", file: "office-stationery.png" },
  { name: "Pens", file: "office-pens.png" },
  { name: "Phone/Desk Stand", file: "office-phone-stand.png" },
  { name: "Printers", file: "office-printer.png" },
  { name: "Photocopy Paper", file: "office-paper.png" },
  { name: "Sticky Notes", file: "office-sticky-notes.png" },
  { name: "Computer Desktops", file: "office-desktop.png" },
];

const UNIFORM_ITEMS = [
  { name: "Company Staff Uniform", file: "uniform-company-staff.png" },
  { name: "Chef Attire", file: "uniform-chef-attire.png" },
  { name: "Chef Kit", file: "uniform-chef-kit.png" },
  { name: "School Uniform", file: "uniform-school.png" },
  { name: "Sports Uniform", file: "uniform-sports.png" },
  { name: "Sport Shoes", file: "uniform-sport-shoes.png" },
  { name: "Safety Apparel", file: "uniform-safety.png" },
  { name: "Corporate Uniform", file: "uniform-corporate.png" },
  { name: "Nurse Staff Uniform", file: "uniform-nurse.png" },
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
          <p className="mt-4 max-w-md text-ink-soft">
            Office Equipment · Staff Uniform · General Supplies · Printing ·
            Corporate Identity
          </p>
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
                  <ul className="mt-4 grid grid-cols-2 gap-1.5 text-sm text-ink-soft">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-accent">Office Equipment</p>
            <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
              Everything for the Workplace
            </h2>
          </Reveal>
          <div className="mt-12">
            <PhotoMasonry items={OFFICE_ITEMS} basePath="/images/office" />
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-accent">Staff Uniform</p>
            <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
              Uniforms for Every Team
            </h2>
          </Reveal>
          <div className="mt-12">
            <PhotoMasonry items={UNIFORM_ITEMS} basePath="/images/uniforms" />
          </div>
        </div>
      </section>
    </div>
  );
}
