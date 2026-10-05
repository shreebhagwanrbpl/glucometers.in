import {
    COMPANY_ID,
    WEBSITE_ID,
    makeSlug,
    isItemVisibleOnWebsite,
} from "./catalog-utils";

import {
    adminFetch,
    fetchCatalogFromAdmin,
} from "./admin-api";

export { makeSlug };

/**
 * Normalize a product coming from Admin MongoDB API.
 */
function normalizeProduct(p = {}, i = 0) {
    const title =
        p.title ||
        p.name ||
        "Biomedical Equipment";

    const images =
        Array.isArray(p.images) && p.images.length
            ? p.images
            : p.image
                ? [p.image]
                : p.imageUrl
                    ? [p.imageUrl]
                    : p.imgUrl
                        ? [p.imgUrl]
                        : [];

    const id =
        p.id ||
        p.uid ||
        p.productId ||
        `${makeSlug(title) || "product"}-${i}`;

    return {
        ...p,

        id,
        productId: p.productId || id,
        uid: p.uid || id,

        title,
        name: title,

        slug: p.slug || makeSlug(title),

        desc: p.desc ?? p.description ?? "",
        description: p.description ?? p.desc ?? "",

        category:
            p.category ||
            "Diagnostic & Laboratory Equipment",

        categoryId:
            p.categoryId ||
            p.categoryID ||
            makeSlug(
                p.category ||
                "diagnostic"
            ),

        subCategory:
            p.subCategory ||
            p.subcategory ||
            p.category ||
            "General",

        subcategoryId:
            p.subcategoryId ||
            p.subCategoryId ||
            makeSlug(
                p.subCategory ||
                p.subcategory ||
                p.category ||
                "general"
            ),

        companyId:
            p.companyId ||
            COMPANY_ID,

        images,

        image:
            images[0] ||
            p.image ||
            "",

        video: p.video || "",
        pdf: p.pdf || "",

        brand: p.brand || "",
        model: p.model || "",
        capacity: p.capacity || "",
        throughput: p.throughput || "",
        instrument: p.instrument || "",
        usage: p.usage || "",
        parameters: p.parameters || "",
        automation: p.automation || "",
        availability: p.availability || "",
        size: p.size || "",

        isPublished:
            p.isPublished !== false,
    };
}

/**
 * Safely unwrap Admin API response.
 */
const unwrap = (response) =>
    response?.data ??
    response?.pages ??
    response ??
    null;

/**
 * Fetch complete product catalog from Admin MongoDB API.
 */
export async function fetchFullCatalog({
    companyId = COMPANY_ID,
    websiteId = WEBSITE_ID,
} = {}) {
    const raw = await fetchCatalogFromAdmin();

    if (!Array.isArray(raw)) {
        return [];
    }

    return raw
        .filter((item) =>
            isItemVisibleOnWebsite(
                item,
                websiteId
            )
        )
        .map(normalizeProduct);
}

/**
 * Fetch category tree from Admin API.
 *
 * If Admin category data is unavailable,
 * categories are safely derived from products.
 */
export async function fetchCategoriesTree({
    companyId = COMPANY_ID,
    websiteId = WEBSITE_ID,
} = {}) {
    try {
        const response = await adminFetch(
            "/api/catalog",
            {},
            {
                websiteId,
                companyId,
            }
        );

        const raw =
            response?.categories ??
            response?.data?.categories;

        if (
            Array.isArray(raw) &&
            raw.length
        ) {
            return raw.filter((category) =>
                isItemVisibleOnWebsite(
                    category,
                    websiteId
                )
            );
        }
    } catch (error) {
        console.warn(
            "Admin category tree failed; deriving categories from products:",
            error
        );
    }

    /**
     * Fallback:
     * Build category/subcategory tree
     * from the MongoDB product catalog.
     */
    const categoryMap = new Map();

    const products =
        await fetchFullCatalog({
            companyId,
            websiteId,
        });

    for (const product of products) {
        const categoryId =
            product.categoryId ||
            makeSlug(
                product.category ||
                "general"
            );

        const categoryName =
            product.category ||
            categoryId;

        if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
                id: categoryId,
                name: categoryName,
                category: categoryName,
                slug: makeSlug(categoryName),
                products: [],
                subcategories: new Map(),
            });
        }

        const category =
            categoryMap.get(categoryId);

        category.products.push(product);

        const subcategoryId =
            product.subcategoryId ||
            makeSlug(
                product.subCategory ||
                "general"
            );

        const subcategoryName =
            product.subCategory ||
            subcategoryId;

        if (
            !category.subcategories.has(
                subcategoryId
            )
        ) {
            category.subcategories.set(
                subcategoryId,
                {
                    id: subcategoryId,
                    name: subcategoryName,
                    subCategory: subcategoryName,
                    slug: makeSlug(
                        subcategoryName
                    ),
                    products: [],
                    productsCount: 0,
                }
            );
        }

        const subcategory =
            category.subcategories.get(
                subcategoryId
            );

        subcategory.products.push(product);
        subcategory.productsCount += 1;
    }

    return Array.from(
        categoryMap.values()
    ).map((category) => ({
        ...category,

        subcategories: Array.from(
            category.subcategories.values()
        ),

        totalProductsCount:
            category.products.length,
    }));
}

/**
 * Return only category names.
 */
export async function fetchCatalogCategories(
    options = {}
) {
    const categories =
        await fetchCategoriesTree(
            options
        );

    return categories.map(
        (category) =>
            category.name ||
            category.category ||
            category.id
    );
}

/**
 * Fetch a complete site page from Admin API.
 */
export async function fetchSitePage(
    pageType,
    websiteId = WEBSITE_ID
) {
    const response =
        await adminFetch(
            "/api/site-data",
            {},
            {
                type: pageType,
                pageType,
                websiteId,
                companyId: COMPANY_ID,
            }
        );

    return unwrap(response);
}

/**
 * Backward-compatible document fetch.
 *
 * Example:
 * pages/home
 * pages/contact
 * pages/services
 */
export async function fetchDocCached(
    path
) {
    const parts = String(
        path || ""
    ).split("/");

    const pagesIndex =
        parts.indexOf("pages");

    if (
        pagesIndex >= 0 &&
        parts[pagesIndex + 1]
    ) {
        return fetchSitePage(
            parts[pagesIndex + 1]
        );
    }

    return null;
}

/**
 * Common site page helpers.
 */
export const fetchHomeData =
    () => fetchSitePage("home");

export const fetchContactData =
    () => fetchSitePage("contact");

export const fetchServicesData =
    () => fetchSitePage("services");

/**
 * Fetch district-specific data.
 */
export async function fetchDistrictData(
    district
) {
    if (!district) {
        return null;
    }

    const response =
        await adminFetch(
            "/api/site-data",
            {},
            {
                type: "district",
                pageType: "district",
                district,
                websiteId: WEBSITE_ID,
                companyId: COMPANY_ID,
            }
        );

    return unwrap(response);
}

/**
 * Fetch all districts from Admin MongoDB API.
 */
export async function fetchDistricts({
    companyId = COMPANY_ID,
    websiteId = WEBSITE_ID,
} = {}) {
    const response =
        await adminFetch(
            "/api/site-data",
            {},
            {
                type: "districts",
                pageType: "districts",
                websiteId,
                companyId,
            }
        );

    const districts =
        response?.data?.districts ??
        response?.data ??
        response?.districts ??
        response;

    if (!Array.isArray(districts)) {
        return [];
    }

    return districts.map(
        (district, index) => ({
            ...district,

            id:
                district.id ||
                district.slug ||
                `dist-${index}`,

            slug:
                district.slug ||
                district.id ||
                makeSlug(
                    district.district ||
                    district.name ||
                    `dist-${index}`
                ),
        })
    );
}

/**
 * Alias for fetchDistricts.
 */
export async function fetchDistrictsList(options = {}) {
    return fetchDistricts(options);
}

/**
 * Fetch a single product by slug or id from the catalog.
 */
export async function fetchProductBySlug(slug = "", options = {}) {
    if (!slug) return null;
    const products = await fetchFullCatalog(options);
    const targetSlug = makeSlug(slug);
    return (
        products.find(
            (p) =>
                p.slug === slug ||
                p.id === slug ||
                p.productId === slug ||
                p.uid === slug ||
                makeSlug(p.slug || "") === targetSlug ||
                makeSlug(p.title || "") === targetSlug ||
                makeSlug(p.name || "") === targetSlug
        ) || null
    );
}

export const getDynamicCatalog = fetchFullCatalog;
export const getDynamicPageData = fetchSitePage;
export const getDynamicDistricts = fetchDistricts;
export const getDynamicDistrictData = fetchDistrictData;
export const getDynamicProductBySlug = fetchProductBySlug;