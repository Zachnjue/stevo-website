"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export type Photo = {
  file?: string;
  url?: string;
  fit?: "contain" | "cover";
};

// One catalogue product. A product with several photos is shown once, with a
// small switcher, instead of being repeated as separate tiles.
export type Product = {
  name: string;
  photos: Photo[];
};

const SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw";

function ProductTile({
  product,
  basePath,
  number,
  delay,
}: {
  product: Product;
  basePath: string;
  number: number;
  delay: number;
}) {
  const [current, setCurrent] = useState(0);
  const { photos } = product;
  const many = photos.length > 1;

  function step(direction: number) {
    setCurrent((c) => (c + direction + photos.length) % photos.length);
  }

  const arrow =
    "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-lg leading-none text-ink transition-opacity hover:bg-paper focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100";

  return (
    <Reveal delay={delay} className="crop-corners relative">
      <div className="group">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper-deep">
          {photos.length === 0 && (
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
              <p className="eyebrow text-ink-soft/60">Photo coming soon</p>
            </div>
          )}

          {photos.map((photo, i) => {
            const src = photo.url ?? (photo.file ? `${basePath}/${photo.file}` : null);
            if (!src) return null;
            const active = i === current;
            return (
              <Image
                key={src}
                src={src}
                alt={active ? `${product.name}${many ? `, photo ${i + 1} of ${photos.length}` : ""}` : ""}
                fill
                sizes={SIZES}
                className={`transition-[opacity,transform] duration-500 group-hover:scale-105 ${
                  photo.fit === "cover" ? "object-cover" : "object-contain p-3"
                } ${active ? "opacity-100" : "opacity-0"}`}
              />
            );
          })}

          {many && (
            <>
              <span className="pointer-events-none absolute right-2 top-2 bg-ink/70 px-2 py-1 text-[0.65rem] font-semibold tracking-widest text-paper">
                {current + 1}/{photos.length}
              </span>
              <button
                type="button"
                aria-label={`Previous photo of ${product.name}`}
                onClick={() => step(-1)}
                className={`${arrow} left-2`}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={`Next photo of ${product.name}`}
                onClick={() => step(1)}
                className={`${arrow} right-2`}
              >
                ›
              </button>
            </>
          )}
        </div>
        <p className="eyebrow mt-3 text-ink-soft">
          <span className="text-accent">{String(number).padStart(2, "0")}</span>{" "}
          — {product.name}
        </p>
      </div>
    </Reveal>
  );
}

export default function PhotoMasonry({
  items,
  basePath,
  startIndex = 0,
}: {
  items: Product[];
  basePath: string;
  /** Number of products that come before this page, within the category. */
  startIndex?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((product, i) => (
        <ProductTile
          key={product.name}
          product={product}
          basePath={basePath}
          number={startIndex + i + 1}
          delay={(i % 4) * 60}
        />
      ))}
    </div>
  );
}
