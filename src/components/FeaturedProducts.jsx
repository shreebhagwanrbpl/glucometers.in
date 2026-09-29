"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts({
  city = "",
  initialProducts = [],
}) {
  const pathname = usePathname();

  // --------------------------------------------------
  // District / City Routing
  // --------------------------------------------------

  const pathParts = pathname?.split("/").filter(Boolean) || [];

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
    "products",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const allProductsUrl = district
    ? `/${district}/items`
    : "/items";

  // --------------------------------------------------
  // Products
  // --------------------------------------------------

  // Products are coming directly from fetchFullCatalog()
  // in the Home page.
  const products = Array.isArray(initialProducts)
    ? initialProducts
    : [];

  // Up to 6 products are shown as Featured Products
  const featured = products.slice(0, 6);

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <section className="relative overflow-hidden py-24">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="container-custom relative z-10">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <SectionTitle
              badge="Our Collection"
              title="Featured Biomedical Equipment"
              description={`Explore our high-performance biomedical diagnostic instruments available in ${city || "your area"
                }.`}
            />
          </div>

          {/* View All Products */}
          {products.length > 3 && (
            <Link
              href={allProductsUrl}
              className="inline-flex shrink-0"
            >
              <button
                type="button"
                className="group flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/80 px-6 py-3.5 font-semibold text-cyan-700 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg"
              >
                <span>View All Products</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Link>
          )}

        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        {featured.length === 0 ? (

          /* No Products */
          <div className="rounded-[32px] border border-cyan-100 bg-white/80 p-12 text-center shadow-lg backdrop-blur-xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-100 text-cyan-600">
              <ArrowRight size={28} />
            </div>

            <h3 className="text-2xl font-bold text-cyan-950">
              No Products Found
            </h3>

            <p className="mt-3 text-cyan-900/60">
              Featured products are currently unavailable.
            </p>

            <Link
              href={allProductsUrl}
              className="mt-7 inline-flex"
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:from-cyan-700 hover:to-sky-600"
              >
                View All Products
                <ArrowRight size={17} />
              </button>
            </Link>

          </div>

        ) : (

          /* Product Grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {featured.map((product, index) => (

              <ProductCard
                key={
                  product.uid ||
                  product.id ||
                  product.slug ||
                  `featured-${index}`
                }
                product={product}
                city={city}
                district={district}
              />

            ))}

          </div>

        )}

        {/* =================================================
            MOBILE CTA
        ================================================= */}

        {products.length > 3 && (
          <div className="mt-8 flex justify-center md:hidden">

            <Link
              href={allProductsUrl}
              className="w-full"
            >
              <button
                type="button"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:from-cyan-700 hover:to-sky-600 hover:shadow-cyan-400/50"
              >
                <span>View All Products</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Link>

          </div>
        )}

      </div>
    </section>
  );
}