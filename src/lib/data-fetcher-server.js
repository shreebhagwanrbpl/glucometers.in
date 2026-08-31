import { 
  fetchFullCatalog as fetchFullCatalogRaw,
  fetchProductBySlug as fetchProductBySlugRaw
} from "./data-fetcher";
import { cache } from "react";

// Global in-memory cache for the server process to bypass Next.js 2MB unstable_cache limit
let activePromise = null;
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    console.log(`[data-fetcher-server] Serving catalog from server memory cache (${((now - cachedCatalogTimestamp) / 1000).toFixed(1)}s old)`);
    return cachedCatalog;
  }

  if (activePromise) {
    console.log("[data-fetcher-server] Awaiting active catalog fetch promise...");
    return activePromise;
  }

  console.log("[data-fetcher-server] Server memory cache miss or expired. Fetching raw catalog from Firestore...");
  activePromise = fetchFullCatalogRaw()
    .then((data) => {
      cachedCatalog = data;
      cachedCatalogTimestamp = Date.now();
      activePromise = null;
      return data;
    })
    .catch((err) => {
      activePromise = null;
      throw err;
    });

  return activePromise;
}

export const fetchFullCatalog = cache(async () => {
  const start = performance.now();
  const products = await getCachedCatalog();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog took ${(end - start).toFixed(2)}ms`);
  return products;
});

export const fetchProductBySlug = cache(async (slug) => {
  return fetchProductBySlugRaw(slug);
});
