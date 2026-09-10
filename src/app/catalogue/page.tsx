import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Catalogue | Thee Printing Hub",
  description:
    "Browse Thee Printing Hub's catalogue of branded merchandise, uniforms, and printed materials.",
};

const PHOTO_ITEMS = [
  { name: "Branded Apparel & T-Shirts", image: "/images/branded-apparel.jpg" },
  { name: "Gift Bags & Promo Sets", image: "/images/gift-bags.jpg" },
  { name: "Chef & Kitchen Uniforms", image: "/images/chef-uniform.jpg" },
  { name: "School Uniforms", image: "/images/school-uniform.jpg" },
  { name: "Safety Apparel", image: "/images/safety-apparel.jpg" },
  { name: "Office Stationery & Supplies", image: "/images/office-supplies.jpg" },
  { name: "Roll-up Banners & Signage", image: "/images/roll-up-banner.jpg" },
  { name: "Printing & Press Work", image: "/images/printing-press.jpg" },
];

const MORE_PHOTO_ITEMS = [
  { name: "Branded Notebooks", image: "/images/branded-notebooks.jpg" },
  { name: "Custom Pens", image: "/images/custom-pens.jpg" },
  { name: "Diaries & Planners", image: "/images/diaries-planners.jpg" },
  { name: "Branded Mugs", image: "/images/branded-mugs.jpg" },
  { name: "Branded Water Bottles", image: "/images/water-bottles.jpg" },
  { name: "Branded Caps", image: "/images/branded-caps.jpg" },
];

const MORE_PLACEHOLDER_ITEMS = [
  { name: "Keychains & Gift Sets", color: "bg-brand-black" },
  { name: "Stickers & Decals", color: "bg-brand-blue" },
];

export default function CataloguePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-black py-16 text-white">
        <Image
          src="/images/printing-press.jpg"
          alt="Printing press"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            Catalogue
          </p>
          <h1 className="mt-2 text-4xl font-bold">A Sample of Our Work</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            A snapshot of the branded products and printed materials we
            produce for our clients. Get in touch for the full catalogue and
            custom quotes.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {PHOTO_ITEMS.map((item) => (
              <div
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-black/5 shadow-sm"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-center text-sm font-medium text-black/80">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-xl font-bold text-brand-black">
            And Much More
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {MORE_PHOTO_ITEMS.map((item) => (
              <div
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-black/5 shadow-sm"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-center text-sm font-medium text-black/80">
                  {item.name}
                </p>
              </div>
            ))}
            {MORE_PLACEHOLDER_ITEMS.map((item) => (
              <div
                key={item.name}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-black/5 p-4 text-center shadow-sm"
              >
                <span className={`h-10 w-10 rounded-full ${item.color}`} />
                <p className="text-sm font-medium text-black/80">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
