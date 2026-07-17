"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowRight
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

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

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {
    if (openedCategory === category) {
      setOpenedCategory("");
      return;
    }

    setOpenedCategory(category);
  };

  const scrollToProduct = (
    slug,
    category
  ) => {
    setOpenedCategory(category);
    setActiveCategory(category);
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-6 max-w-2xl px-4 lg:mt-10 lg:px-0">

          {/* Search Icon */}
          <div className="absolute left-9 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40">
            <Search size={18} />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="h-16 w-full rounded-2xl border border-cyan-200 bg-white/80 pl-20 pr-5 text-cyan-950 placeholder:text-cyan-400 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,145,178,0.08)] outline-none transition-all duration-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-200/40"
          />

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
    self-start
    rounded-3xl
    border border-cyan-100
    bg-white/70
    backdrop-blur-xl
    shadow-[0_20px_60px_rgba(8,145,178,0.12)]
    p-4 lg:p-6
    lg:sticky
    lg:top-24
  "
          >

            {/* Heading */}
            <h3 className="mb-6 text-2xl font-extrabold text-cyan-950">
              Categories
            </h3>

            <div className="space-y-4">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (
                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-cyan-100 bg-white/60 backdrop-blur-md shadow-sm"
                  >

                    {/* Category Button */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`w-full px-5 py-4 flex items-center justify-between transition-all duration-300
              ${activeCategory === category
                          ? "bg-gradient-to-r from-cyan-600 to-sky-500 text-white"
                          : "bg-white/70 text-cyan-900 hover:bg-cyan-50"
                        }`}
                    >

                      <span className="flex items-center gap-3 font-semibold">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${activeCategory === category
                          ? "bg-white/20 text-white"
                          : "bg-cyan-100 text-cyan-700"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    {/* Products */}
                    <div
                      className={`custom-scrollbar overflow-y-auto transition-all duration-300 ${openedCategory === category
                        ? "max-h-72"
                        : "max-h-0 overflow-hidden"
                        }`}
                    >

                      {groupedProducts[category].map((item) => (
                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-cyan-100 px-6 py-3 text-left text-cyan-900/70 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                          {item.title}
                        </button>
                      ))}

                    </div>

                  </div>
                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="rounded-[32px] border border-cyan-100 bg-white/70 p-10 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)] lg:p-16">

                {/* Search Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-5xl text-white shadow-lg shadow-cyan-300/40">
                  🔍
                </div>

                {/* Title */}
                <h2 className="text-2xl font-extrabold text-cyan-950 lg:text-4xl">
                  Product Not Found
                </h2>

                {/* Gradient Line */}
                <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                {/* Description */}
                <p className="mx-auto mt-6 max-w-xl leading-8 text-cyan-900/70">
                  We couldn't find any products matching

                  <span className="font-bold text-cyan-600">
                    {" "}
                    "{productSearch}"
                    {" "}
                  </span>

                  Please try another keyword or browse available categories.
                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50"
                >
                  View All Products

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="mb-8 flex flex-col gap-3 border-b border-cyan-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Category Title */}
                      <div>

                        <h2 className="text-3xl font-extrabold text-cyan-950">
                          {category}
                        </h2>

                        {/* Gradient Line */}
                        <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                      </div>

                      {/* Product Count */}
                      <span className="inline-flex w-fit items-center rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-sm">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="group rounded-[32px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_25px_60px_rgba(8,145,178,0.18)]"
                        >

                          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[240px_1fr_180px] lg:gap-8">

                            {/* Image */}
                            <div className="relative h-[180px] overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF] sm:h-[220px]">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-cyan-100" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`h-full w-full object-contain p-5 transition-all duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}
                            <div>

                              <h3 className="text-2xl font-bold text-cyan-950 transition-colors duration-300 group-hover:text-cyan-600">
                                {product.title}
                              </h3>

                              <p className="mt-4 leading-8 text-cyan-900/70">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                              </p>

                              {/* Info Boxes */}
                              <div className="mt-6 grid gap-4 md:grid-cols-2">

                                {[
                                  {
                                    label: "Brand",
                                    value: product.brand || "N/A",
                                  },
                                  {
                                    label: "Model",
                                    value: product.model || "N/A",
                                  },
                                  {
                                    label: "Instrument",
                                    value: product.instrument || "N/A",
                                  },
                                  {
                                    label: "Category",
                                    value: product.category || "N/A",
                                  },
                                ].map((info, i) => (
                                  <div
                                    key={i}
                                    className="rounded-xl border border-cyan-100 bg-white/70 p-4 backdrop-blur-md transition hover:border-cyan-300 hover:bg-cyan-50"
                                  >
                                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                                      {info.label}
                                    </p>

                                    <p className="mt-1 font-semibold text-cyan-950">
                                      {info.value}
                                    </p>
                                  </div>
                                ))}

                              </div>

                            </div>

                            {/* CTA */}
                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50"
                              >
                                Get Quote

                                <ArrowRight
                                  size={18}
                                  className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability, and healthcare excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[30px] border border-cyan-100 bg-white/70 p-8 text-center backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_20px_60px_rgba(8,145,178,0.18)]"
              >

                {/* Glow */}
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-200/20 blur-3xl" />

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-cyan-950 transition-colors duration-300 group-hover:text-cyan-600">
                  {item.title}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200 bg-gradient-to-br from-cyan-600 to-sky-500 text-white shadow-[0_15px_40px_rgba(8,145,178,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_20px_50px_rgba(8,145,178,0.45)]"
        >

          <ChevronUp
            size={24}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />

        </button>

      )}

    </>

  );

}