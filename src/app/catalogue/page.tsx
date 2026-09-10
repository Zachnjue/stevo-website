import type { Metadata } from "next";
import PhotoMasonry from "@/components/PhotoMasonry";
import RegMark from "@/components/RegMark";

export const metadata: Metadata = {
  title: "Catalogue | Thee Printing Hub",
  description:
    "Browse Thee Printing Hub's catalogue of branded merchandise, uniforms, and printed materials — real work produced for our clients.",
};

const CATALOGUE_ITEMS = [
  { name: "Branded Passport Holders", file: "cat-passport-holder.png" },
  { name: "Custom Pens", file: "cat-pens.png" },
  { name: "Custom Printed T-Shirts", file: "cat-tshirts.png" },
  { name: "Gift Bags & Tags", file: "cat-gift-tags.png" },
  { name: "Brochures & Flyers", file: "cat-brochure-fan.png" },
  { name: "Branded Notebooks", file: "cat-notebooks.png" },
  { name: "Keychains & Gift Sets", file: "cat-keychain-box.png" },
  { name: "Safety Vests", file: "cat-safety-vest.png" },
  { name: "Stickers & Decals", file: "cat-sticker-badge.png" },
  { name: "Spiral Notebooks", file: "cat-spiral-notebook.png" },
  { name: "Branded Mugs", file: "cat-mug-orange.png" },
  { name: "Water Bottles", file: "cat-bottle-black-wood.png" },
  { name: "Branded Caps", file: "cat-caps.png" },
  { name: "Water Bottles", file: "cat-bottle-blue.png" },
  { name: "Roll-up Banners", file: "cat-rollup-banners.png" },
];

export default function CataloguePage() {
  return (
    <div>
      <section className="border-b border-line px-6 py-16 sm:px-10 sm:py-24">
        <p className="eyebrow flex items-center gap-2 text-ink-soft">
          <RegMark className="h-4 w-4 text-brand-blue" />
          Catalogue
        </p>
        <h1 className="font-display mt-4 text-5xl leading-tight text-ink sm:text-6xl">
          A Sample of Our Work
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          Real branded products and printed materials we&apos;ve produced
          for our clients. Get in touch for the full catalogue and custom
          quotes.
        </p>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-24">
        <PhotoMasonry
          items={CATALOGUE_ITEMS}
          basePath="/images/catalogue"
          fit="cover"
        />
      </section>
    </div>
  );
}
