import { createClient } from "@supabase/supabase-js";

export const BASE_URL = "https://www.theeprintinghub.com";

const LOCAL_PREFIX = "local:";
const LOCAL_IMAGE_DIR = "/images/catalogue";

export type CatalogueImage = {
  /** Path or URL usable by next/image. */
  src: string;
  /** Absolute URL, for sitemaps and structured data. */
  absoluteUrl: string;
  fit: "contain" | "cover";
};

export type CatalogueProduct = {
  name: string;
  slug: string;
  categoryTitle: string;
  images: CatalogueImage[];
};

export type CatalogueCategory = {
  id: string;
  title: string;
  products: CatalogueProduct[];
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Read-only, cookie-free client: the catalogue is public, and keeping cookies
// out lets the product pages and sitemap be statically generated.
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

/**
 * Categories with their photographed products. Rows that share a name within
 * a category are one product with several photos. Pieces still waiting on a
 * photo are left out, matching what the catalogue page shows.
 */
export async function getCatalogue(): Promise<CatalogueCategory[]> {
  const supabase = publicClient();

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("catalogue_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  function toImage(path: string, fit: "contain" | "cover"): CatalogueImage {
    let src: string;
    if (path.startsWith(LOCAL_PREFIX)) {
      const local = path.slice(LOCAL_PREFIX.length);
      // A leading "/" is already a full public path (seeded from another
      // section's images); otherwise it lives in the catalogue image folder.
      src = local.startsWith("/") ? local : `${LOCAL_IMAGE_DIR}/${local}`;
    } else {
      src = supabase.storage.from("catalogue").getPublicUrl(path).data.publicUrl;
    }
    return {
      src,
      absoluteUrl: src.startsWith("/") ? `${BASE_URL}${src}` : src,
      fit,
    };
  }

  const usedSlugs = new Map<string, string>(); // slug -> category id
  const result: CatalogueCategory[] = [];

  for (const category of categories ?? []) {
    const byName = new Map<string, CatalogueProduct>();

    for (const item of items ?? []) {
      if (item.category_id !== category.id || !item.image_path) continue;
      const image = toImage(item.image_path, item.fit as "contain" | "cover");
      const existing = byName.get(item.name);
      if (existing) {
        existing.images.push(image);
        continue;
      }

      // Two categories could hold a product with the same name; keep slugs unique.
      let slug = slugify(item.name);
      const owner = usedSlugs.get(slug);
      if (owner && owner !== category.id) {
        slug = `${slug}-${slugify(category.title)}`;
      }
      usedSlugs.set(slug, category.id);

      byName.set(item.name, {
        name: item.name,
        slug,
        categoryTitle: category.title,
        images: [image],
      });
    }

    if (byName.size > 0) {
      result.push({
        id: category.id,
        title: category.title,
        products: [...byName.values()],
      });
    }
  }

  return result;
}

export async function getProducts(): Promise<CatalogueProduct[]> {
  return (await getCatalogue()).flatMap((c) => c.products);
}

/** Unique page copy per product, so no two product pages read the same. */
const DESCRIPTIONS: Record<string, string> = {
  diaries:
    "Custom branded diaries and planners, printed and finished in Nairobi by Thee Printing Hub. Choose your cover material, colours, and logo placement for corporate gifting, staff and client giveaways, or events.",
};

export function describeProduct(product: CatalogueProduct) {
  return (
    DESCRIPTIONS[product.slug] ??
    `Custom branded ${product.name.toLowerCase()} from Thee Printing Hub, a branding and printing company in Nairobi. Part of our ${product.categoryTitle.toLowerCase()} range, made to your logo and colours. Request a quote.`
  );
}
