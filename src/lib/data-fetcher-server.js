import {
    fetchFullCatalog as a,
    fetchCategoriesTree as b,
    fetchCatalogCategories as c,
    fetchDistricts as d,
    fetchDistrictsList as e,
    fetchProductBySlug as f,
    fetchHomeData,
    fetchContactData,
    fetchServicesData,
    fetchDistrictData,
    fetchSitePage,
    fetchDocCached,
    makeSlug,
    getDynamicProductBySlug,
    getDynamicCatalog,
    getDynamicDistricts,
    getDynamicDistrictData,
    getDynamicPageData,
} from "./data-fetcher";

export const dynamic = "force-dynamic";

export const fetchFullCatalog = (o = {}) => a(o);
export const fetchCategoriesTree = (o = {}) => b(o);
export const fetchCatalogCategories = (o = {}) => c(o);
export const fetchDistricts = (o = {}) => d(o);
export const fetchDistrictsList = (o = {}) => e(o);
export const fetchProductBySlug = (slug, o = {}) => f(slug, o);

export {
    fetchHomeData,
    fetchContactData,
    fetchServicesData,
    fetchDistrictData,
    fetchSitePage,
    fetchDocCached,
    makeSlug,
    getDynamicProductBySlug,
    getDynamicCatalog,
    getDynamicDistricts,
    getDynamicDistrictData,
    getDynamicPageData,
};
