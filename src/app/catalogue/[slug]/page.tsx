import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RegMark from "@/components/RegMark";
import {
  BASE_URL,
  describeProduct,
  getProducts,
  type CatalogueProduct,
} from "@/lib/catalogue";

// Product pages are static, refreshed hourly (and on admin edits).
export const revalidate = 3600;

async function findProduct(slug: string): Promise<CatalogueProduct | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalogue/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) return {};

  const title = `${product.name} in Nairobi | Thee Printing Hub`;
  const description = describeProduct(product);
  const url = `${BASE_URL}/catalogue/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: product.images.slice(0, 4).map((i) => i.absoluteUrl),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/catalogue/[slug]">) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) notFound();

  const description = describeProduct(product);
  const url = `${BASE_URL}/catalogue/${product.slug}`;

  // No price, rating or review is published, and Google rejects a Product
  // without one of offers/review/aggregateRating, so this is a WebPage.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: product.name,
    description,
    url,
    primaryImageOfPage: product.images[0]
      ? { "@type": "ImageObject", url: product.images[0].absoluteUrl }
      : undefined,
    image: product.images.map((i) => i.absoluteUrl),
    about: product.categoryTitle,
    isPartOf: { "@type": "WebSite", name: "Thee Printing Hub", url: BASE_URL },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: `${BASE_URL}/catalogue` },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  const [hero, ...rest] = product.images;

  return (
    <div>
      {[jsonLd, breadcrumbs].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <section className="bg-brand-navy px-6 py-14 text-paper sm:px-10 sm:py-20">
        <p className="eyebrow flex items-center gap-2 text-paper/80">
          <RegMark className="h-4 w-4" />
          <Link href="/catalogue" className="link-reveal">
            Catalogue
          </Link>
          <span aria-hidden="true">/</span>
          {product.categoryTitle}
        </p>
        <h1 className="display-light mt-6 max-w-4xl text-5xl leading-[0.98] sm:text-7xl">
          {product.name}
        </h1>
        <p className="mt-6 max-w-xl text-paper/85">{description}</p>
        <Link
          href="/contact"
          className="eyebrow mt-8 inline-block border-b border-paper pb-1 hover:text-brand-yellow"
        >
          Request a quote →
        </Link>
      </section>

      <section className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {[hero, ...rest].map((image, i) => (
            <div
              key={image.src}
              className={`relative aspect-[4/5] overflow-hidden border border-line bg-paper-deep ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={image.src}
                alt={`${product.name} by Thee Printing Hub, photo ${i + 1} of ${product.images.length}`}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className={image.fit === "cover" ? "object-cover" : "object-contain p-3"}
              />
            </div>
          ))}
        </div>

        <Link
          href="/catalogue"
          className="eyebrow mt-14 inline-block text-ink-soft hover:text-accent"
        >
          ← Back to the catalogue
        </Link>
      </section>
    </div>
  );
}
