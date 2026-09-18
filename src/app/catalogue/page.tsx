import type { Metadata } from "next";
import PhotoMasonry from "@/components/PhotoMasonry";
import RegMark from "@/components/RegMark";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Catalogue | Thee Printing Hub",
  description:
    "Browse Thee Printing Hub's catalogue of branded merchandise, uniforms, and printed materials — real work produced for our clients.",
};

const LOCAL_PREFIX = "local:";

export default async function CataloguePage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("catalogue_items")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  const itemsByCategory = new Map<string, typeof items>();
  for (const item of items ?? []) {
    const list = itemsByCategory.get(item.category_id) ?? [];
    list.push(item);
    itemsByCategory.set(item.category_id, list);
  }

  let runningIndex = 0;

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

      {(categories ?? []).map((category) => {
        const categoryItems = itemsByCategory.get(category.id) ?? [];
        if (categoryItems.length === 0) return null;

        const masonryItems = categoryItems.map((item) => {
          if (item.image_path?.startsWith(LOCAL_PREFIX)) {
            const localPath = item.image_path.slice(LOCAL_PREFIX.length);
            // A path starting with "/" is already a full public path (e.g.
            // seeded from another section's images) — use it as-is instead
            // of joining it under the catalogue's own image folder.
            return localPath.startsWith("/")
              ? { name: item.name, url: localPath, fit: item.fit as "contain" | "cover" }
              : {
                  name: item.name,
                  file: localPath,
                  fit: item.fit as "contain" | "cover",
                };
          }
          if (item.image_path) {
            const {
              data: { publicUrl },
            } = supabase.storage.from("catalogue").getPublicUrl(item.image_path);
            return {
              name: item.name,
              url: publicUrl,
              fit: item.fit as "contain" | "cover",
            };
          }
          return { name: item.name, fit: item.fit as "contain" | "cover" };
        });

        const startIndex = runningIndex;
        runningIndex += masonryItems.length;

        return (
          <section
            key={category.id}
            className="border-b border-line px-6 py-16 last:border-b-0 sm:px-10 sm:py-24"
          >
            <h2 className="font-display mb-10 text-3xl text-ink sm:text-4xl">
              {category.title}
            </h2>
            <PhotoMasonry
              items={masonryItems}
              basePath="/images/catalogue"
              startIndex={startIndex}
            />
          </section>
        );
      })}
    </div>
  );
}
