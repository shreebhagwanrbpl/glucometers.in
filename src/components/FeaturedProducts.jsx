"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function FeaturedProducts({ city }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Extract district from URL path to preserve district routing context
  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "items", "contact"];
  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const allProductsUrl = district ? `/${district}/items` : `/items`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {
          const data = categoryDoc.data();
          const categoryProducts = (data.products || [])
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `${categoryDoc.id}-${index}`,
              category: data.category || categoryDoc.id,
              slug: item.slug || makeSlug(item.title),
            }));

          allProducts.push(...categoryProducts);
        });

        const oldSnap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "products")
        );

        if (oldSnap.exists()) {
          const oldProducts = (oldSnap.data().products || [])
            .filter((p) => p.isPublished !== false)
            .map((item, index) => ({
              ...item,
              uid: `other-${index}`,
              category: "Other Products",
              slug: item.slug || makeSlug(item.title),
            }));

          allProducts.push(...oldProducts);
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to fetch products for featured list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featured = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  return (
    <section className="section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">
      <div className="container-custom">

        {/* Title */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <SectionTitle
              badge="Our Collection"
              title="Featured Biomedical Equipment"
              description={`Explore our high-performance biomedical diagnostic instruments available in ${city || "your area"
                }.`}
            />
          </div>

          {!loading && products.length > 3 && (
            <Link href={allProductsUrl} className="inline-flex">
              <button className="group flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/80 px-6 py-3.5 font-semibold text-cyan-700 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg">
                <span>View All Products</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Link>
          )}

        </div>

        {/* Loader */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[450px] animate-pulse rounded-[32px] border border-cyan-100 bg-white/70 backdrop-blur-xl"
              />
            ))}
          </div>
        ) : featured.length === 0 ? (

          <div className="rounded-[32px] border border-cyan-100 bg-white/70 p-12 text-center shadow-lg backdrop-blur-xl">
            <p className="font-medium text-cyan-900/70">
              No products found.
            </p>
          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard
                key={product.uid}
                product={product}
                city={city}
              />
            ))}
          </div>

        )}

        {/* Mobile CTA */}
        {!loading && products.length > 3 && (
          <div className="mt-8 flex justify-center md:hidden">

            <Link href={allProductsUrl} className="w-full">

              <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">

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
