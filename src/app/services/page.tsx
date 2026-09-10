import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "What We Do | Thee Printing Hub",
  description:
    "Office equipment, staff uniforms, general supplies, printing, and corporate identity services from Thee Printing Hub.",
};

const SECTIONS = [
  {
    title: "Office Equipment",
    color: "border-brand-blue",
    image: "/images/office-supplies.jpg",
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
    title: "Staff Uniform",
    color: "border-brand-pink",
    image: "/images/chef-uniform.jpg",
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
    title: "General Supplies & Printing",
    color: "border-brand-yellow",
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
    title: "Corporate Identity",
    color: "border-brand-black",
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

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-blue py-16 text-white">
        <Image
          src="/images/branded-apparel.jpg"
          alt="Branded apparel"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            What We Do
          </p>
          <h1 className="mt-2 text-4xl font-bold">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Office Equipment · Staff Uniform · General Supplies · Printing ·
            Corporate Identity
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className={`overflow-hidden rounded-2xl border-t-4 ${s.color} bg-zinc-50 shadow-sm`}
            >
              <div className="relative h-48 w-full">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-brand-black">{s.title}</h2>
                <p className="mt-2 text-sm text-black/70">{s.desc}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-black/80">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-brand-black">
            Uniforms for Every Team
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src="/images/chef-uniform.jpg"
                alt="Chef uniforms in a professional kitchen"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src="/images/school-uniform.jpg"
                alt="Students in school uniforms"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src="/images/safety-apparel.jpg"
                alt="Workers in high-visibility safety apparel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
