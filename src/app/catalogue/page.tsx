import type { Metadata } from "next";
import CategoryGallery from "@/components/CategoryGallery";
import type { Product } from "@/components/PhotoMasonry";
import RegMark from "@/components/RegMark";
import { getCatalogue, type CatalogueProduct } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Catalogue | Thee Printing Hub",
  description:
    "Browse Thee Printing Hub's catalogue of branded merchandise, uniforms, and printed materials — real work produced for our clients.",
};

const INK_BARS = ["bg-brand-blue", "bg-brand-pink", "bg-brand-yellow", "bg-ink"];

// Same hourly refresh as the product pages; admin edits revalidate sooner.
export const revalidate = 3600;

export default async function CataloguePage() {
  // Only categories with at least one photographed product are returned.
  const visibleCategories = await getCatalogue();

  // Rows that share a name within a category are one product with several
  // photos, so each product is listed once (grouped in getCatalogue).
  function toProducts(products: CatalogueProduct[]): Product[] {
    return products.map((p) => ({
      name: p.name,
      slug: p.slug,
      photos: p.images.map((i) => ({ url: i.src, fit: i.fit })),
    }));
  }

  return (
    <div>
      <section className="bg-brand-navy px-6 py-16 text-paper sm:px-10 sm:py-28">
        <p className="eyebrow flex items-center gap-2 text-paper/80">
          <RegMark className="h-4 w-4" />
          Catalogue
        </p>
        <h1 className="display-light mt-6 max-w-4xl text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">
          A sample of our work.
        </h1>
        <p className="mt-6 max-w-md text-paper/85">
          Real branded products and printed materials we&apos;ve produced
          for our clients. Get in touch for the full catalogue and custom
          quotes.
        </p>
        <nav
          aria-label="Catalogue categories"
          className="eyebrow mt-10 flex flex-wrap gap-x-8 gap-y-3"
        >
          {visibleCategories.map((c) => (
            <a key={c.id} href={`#category-${c.id}`} className="link-reveal">
              {c.title}
            </a>
          ))}
        </nav>
      </section>

      {visibleCategories.map((category, ci) => {
        // Numbering restarts at 01 in every category.
        const products = toProducts(category.products);

        return (
          <section
            key={category.id}
            id={`category-${category.id}`}
            className="scroll-mt-24 border-b border-line px-6 py-16 last:border-b-0 sm:px-10 sm:py-24"
          >
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                {/* Cycles through the four inks in the logo */}
                <span
                  aria-hidden="true"
                  className={`mb-5 block h-1.5 w-14 ${INK_BARS[ci % INK_BARS.length]}`}
                />
                <h2 className="display-light text-4xl text-ink sm:text-6xl">
                  {category.title}
                </h2>
              </div>
              <p className="eyebrow shrink-0 text-ink-soft">
                {String(products.length).padStart(2, "0")} products
              </p>
            </div>
            <CategoryGallery
              items={products}
              basePath="/images/catalogue"
              pageSize={5}
              anchorId={`category-${category.id}`}
            />
          </section>
        );
      })}
    </div>
  );
}
