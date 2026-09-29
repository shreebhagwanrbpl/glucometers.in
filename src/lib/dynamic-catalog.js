import "server-only";
import { readCollection, readDocument } from "./sqliteDb";
import { COMPANY_ID, WEBSITE_ID, isItemVisibleOnWebsite, makeSlug } from "./catalog-utils";

export function getDynamicCatalog() {
  const cats = readCollection(`companies/${COMPANY_ID}/categories`);
  const visibleCats = new Map(cats.filter(isItemVisibleOnWebsite).map((c) => [c.id, c]));
  const products = [];

  for (const cat of cats) {
    if (!visibleCats.has(cat.id)) continue;
    const catName = cat.name || cat.category || cat.title || "Test Strips";
    const subs = readCollection(`companies/${COMPANY_ID}/categories/${cat.id}/subcategories`);
    for (const sub of subs) {
      if (!isItemVisibleOnWebsite(sub)) continue;
      const subName = sub.name || sub.subCategory || sub.title || catName;
      const embedded = Array.isArray(sub.products) ? sub.products : [];
      for (const p of embedded) {
        if (isItemVisibleOnWebsite(p)) {
          products.push({
            ...p,
            category: p.category || catName,
            subCategory: p.subCategory || subName,
            slug: p.slug || makeSlug(p.title),
          });
        }
      }
      const child = readCollection(
        `companies/${COMPANY_ID}/categories/${cat.id}/subcategories/${sub.id}/products`
      );
      for (const p of child) {
        if (isItemVisibleOnWebsite(p)) {
          products.push({
            ...p,
            category: p.category || catName,
            subCategory: p.subCategory || subName,
            slug: p.slug || makeSlug(p.title),
          });
        }
      }
    }
  }

  const directProducts = readCollection(`companies/${COMPANY_ID}/products`);
  for (const p of directProducts) {
    if (!isItemVisibleOnWebsite(p)) continue;
    if (p.categoryId && !visibleCats.has(p.categoryId)) continue;
    if (
      p.category &&
      cats.length &&
      !cats.some(
        (c) =>
          isItemVisibleOnWebsite(c) &&
          (c.category || c.name || c.title) === p.category
      )
    )
      continue;
    products.push({ ...p, slug: p.slug || makeSlug(p.title) });
  }

  const unique = new Map(products.map((p, i) => [p.id || p.uid || p.slug || `${p.title}-${i}`, p]));
  return [...unique.values()];
}

export function getDynamicProductBySlug(slug = "") {
  const cleanSlug = makeSlug(slug);
  const catalog = getDynamicCatalog();
  return (
    catalog.find(
      (p) =>
        p.slug === slug ||
        makeSlug(p.slug || "") === cleanSlug ||
        makeSlug(p.title || "") === cleanSlug
    ) || null
  );
}

export function getDynamicPageData(page = "home") {
  return readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/pages/${page}`) || null;
}

export function getDynamicDistricts() {
  return readCollection(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts`) || [];
}

export function getDynamicDistrictData(district = "") {
  return readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts/${district}`) || null;
}
