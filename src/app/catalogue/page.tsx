import type { Metadata } from "next";
import CategoryGallery from "@/components/CategoryGallery";
import type { Photo, Product } from "@/components/PhotoMasonry";
import RegMark from "@/components/RegMark";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Catalogue | Thee Printing Hub",
  description:
    "Browse Thee Printing Hub's catalogue of branded merchandise, uniforms, and printed materials — real work produced for our clients.",
};

const LOCAL_PREFIX = "local:";
const INK_BARS = ["bg-brand-blue", "bg-brand-pink", "bg-brand-yellow", "bg-ink"];

export default async function CataloguePage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("catalogue_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  const itemsByCategory = new Map<string, typeof items>();
  for (const item of items ?? []) {
    // Only show finished work: pieces still waiting on a photo stay hidden.
    if (!item.image_path) continue;
    const list = itemsByCategory.get(item.category_id) ?? [];
    list.push(item);
    itemsByCategory.set(item.category_id, list);
  }

  // Categories that have at least one photographed piece.
  const visibleCategories = (categories ?? []).filter(
    (c) => (itemsByCategory.get(c.id) ?? []).length > 0
  );

  // Turn a database row's stored path into a photo the gallery can display.
  function toPhoto(item: NonNullable<typeof items>[number]): Photo {
    const fit = item.fit as "contain" | "cover";
    const path = item.image_path as string;
    if (path.startsWith(LOCAL_PREFIX)) {
      const localPath = path.slice(LOCAL_PREFIX.length);
      // A path starting with "/" is already a full public path (e.g. seeded
      // from another section's images) — use it as-is instead of joining it
      // under the catalogue's own image folder.
      return localPath.startsWith("/")
        ? { url: localPath, fit }
        : { file: localPath, fit };
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("catalogue").getPublicUrl(path);
    return { url: publicUrl, fit };
  }

  // Rows that share a name within a category are one product with several
  // photos, so each product is listed once (in the order it first appears).
  function toProducts(rows: NonNullable<typeof items>): Product[] {
    const byName = new Map<string, Product>();
    for (const row of rows) {
      const existing = byName.get(row.name);
      if (existing) existing.photos.push(toPhoto(row));
      else byName.set(row.name, { name: row.name, photos: [toPhoto(row)] });
    }
    return [...byName.values()];
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
        const products = toProducts(itemsByCategory.get(category.id) ?? []);

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
