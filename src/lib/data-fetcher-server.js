import { cache } from "react";
import {
  getDynamicCatalog,
  getDynamicProductBySlug,
  getDynamicPageData,
  getDynamicDistricts,
  getDynamicDistrictData,
} from "./dynamic-catalog";
import { makeSlug } from "./catalog-utils";

export const fetchFullCatalog = cache(async () => {
  return getDynamicCatalog();
});

export const getProductBySlug = cache(async (slug) => {
  return getDynamicProductBySlug(slug);
});

export const fetchProductBySlug = getProductBySlug;

export const fetchHomeData = cache(async () => {
  return getDynamicPageData("home");
});

export const fetchContactData = cache(async () => {
  return getDynamicPageData("contact");
});

export const fetchServicesData = cache(async () => {
  return getDynamicPageData("services");
});

export const fetchDistrictData = cache(async (district) => {
  return getDynamicDistrictData(district);
});

export const fetchDistrictsList = cache(async () => {
  return getDynamicDistricts();
});

export const fetchDistrictsInState = cache(async () => {
  return fetchDistrictsList();
});

export const getAllCategories = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = p.category || "General";
    const slug = makeSlug(name);
    if (!map.has(slug)) map.set(slug, { name, slug, products: [] });
    map.get(slug).products.push(p);
  });
  return [...map.values()];
});

export const getCategoryBySlug = cache(async (slug) =>
  (await getAllCategories()).find((c) => c.slug === slug) || null
);

export const getAllBrands = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = p.brand || "";
    if (!name) return;
    const slug = makeSlug(name);
    if (!map.has(slug)) map.set(slug, { name, slug, products: [] });
    map.get(slug).products.push(p);
  });
  return [...map.values()];
});

export { makeSlug };
