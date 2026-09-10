import type { Metadata } from "next";
import Image from "next/image";
import PhotoMasonry from "@/components/PhotoMasonry";
import TornDivider from "@/components/TornDivider";
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
      <section className="relative overflow-hidden bg-brand-black py-16 text-white">
        <Image
          src="/images/printing-press.jpg"
          alt="Printing press"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            <RegMark className="h-4 w-4" />
            Catalogue
          </p>
          <h1 className="mt-2 text-4xl font-bold">A Sample of Our Work</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Real branded products and printed materials we&apos;ve produced
            for our clients. Get in touch for the full catalogue and custom
            quotes.
          </p>
        </div>
        <TornDivider color="#ffffff" className="absolute bottom-0 left-0" />
      </section>

      <section className="bg-dot-grid bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <PhotoMasonry
            items={CATALOGUE_ITEMS}
            basePath="/images/catalogue"
            fit="cover"
          />
        </div>
      </section>
    </div>
  );
}
