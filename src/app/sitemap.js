import { fetchFullCatalog, fetchDistrictsList } from "@/lib/data-fetcher-server";

export const revalidate = 3600;

export default async function sitemap() {
    const baseUrl = "https://glucometers.in";

    const urls = [];
    const addedUrls = new Set();

    const addUrl = (url, changefreq = "daily", priority = 0.7) => {
        if (!addedUrls.has(url)) {
            addedUrls.add(url);
            urls.push({
                url,
                lastModified: new Date(),
                changeFrequency: changefreq,
                priority,
            });
        }
    };

    // Static Pages
    addUrl(baseUrl, "daily", 1.0);
    addUrl(`${baseUrl}/about`, "monthly", 0.6);
    addUrl(`${baseUrl}/services`, "weekly", 0.7);
    addUrl(`${baseUrl}/contact`, "monthly", 0.6);
    addUrl(`${baseUrl}/items`, "daily", 0.8);

    try {
        // DISTRICTS
        const districts = await fetchDistrictsList().catch(() => []);

        districts.forEach((district) => {
            const slug = typeof district === "string" ? district : district?.slug;
            if (!slug) return;

            addUrl(`${baseUrl}/${slug}`, "daily", 0.8);
            addUrl(`${baseUrl}/${slug}/about`, "monthly", 0.5);
            addUrl(`${baseUrl}/${slug}/services`, "weekly", 0.5);
            addUrl(`${baseUrl}/${slug}/contact`, "monthly", 0.5);
            addUrl(`${baseUrl}/${slug}/items`, "daily", 0.7);
        });

        // PRODUCTS (Using cached server fetch for performance and completeness)
        const products = await fetchFullCatalog().catch(() => []);

        products.forEach((product) => {
            if (!product.slug) return;

            // Main Product URL
            addUrl(`${baseUrl}/items/${product.slug}`, "weekly", 0.8);
        });
    } catch (error) {
        console.error("Sitemap Error:", error);
    }

    return urls;
}