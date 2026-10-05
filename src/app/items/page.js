import { Suspense } from "react";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Biomedical & Diagnostic Laboratory Equipment Catalog | Raj Biosis",
  description: "Browse our complete catalog of medical laboratory diagnostic equipment, including CBC machines, biochemistry analyzers, urine analyzers, and ELISA readers.",
  alternates: {
    canonical: "https://glucometers.in/items",
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache and slice for initial render
  const allProducts = await fetchFullCatalog();
  const initialProducts = allProducts.slice(0, 50);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyan-800">Loading Products...</div>}>
      <ProductsClient
        initialProducts={initialProducts}
        district={district}
        city={city}
      />
    </Suspense>
  );
}