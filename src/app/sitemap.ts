import type { MetadataRoute } from "next";
import { BASE_URL, getProducts } from "@/lib/catalogue";

// Refreshed hourly so new catalogue items appear without a redeploy.
export const revalidate = 3600;

// Edit this list to match the pages on your site.
// priority: 1.0 = most important, 0.5 = least
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/catalogue", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = routes.map((route) => ({
        url: `${BASE_URL}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // One URL per catalogue product, generated from the database.
    const products = (await getProducts()).map((product) => ({
        url: `${BASE_URL}/catalogue/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        images: product.images.map((i) => i.absoluteUrl),
    }));

    return [...pages, ...products];
}
