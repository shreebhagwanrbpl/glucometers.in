import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";

const ProductCard = React.memo(function ProductCard({ product, city, district, layout = "grid" }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const pathname = usePathname();

  // Extract district from URL path to preserve district routing (without navigation reset)
  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "items", "contact"];
  const resolvedDistrict = district !== undefined ? district : (
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : ""
  );

  const detailUrl = resolvedDistrict
    ? `/${resolvedDistrict}/items/${product.slug}`
    : `/items/${product.slug}`;

  const imageUrl = product.images?.[0] || product.image || "/placeholder.jpg";

  if (layout === "grid") {
    // Vertical card layout for Homepage Grid (restored from original working layout)
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-cyan-100 bg-white/70 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_25px_60px_rgba(8,145,178,0.18)] w-full min-w-0">
        {/* Product Image */}
        <div className="relative flex aspect-video overflow-hidden bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF] p-6 sm:aspect-square md:aspect-video lg:aspect-[4/3]">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-cyan-100" />
          )}
          <img
            src={imageUrl}
            alt={`${product.title} biomedical equipment`}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
              setImgLoaded(true);
            }}
            className={`m-auto max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 ${imgLoaded
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
              }`}
          />
          {product.category && (
            <span className="absolute left-4 top-4 rounded-full border border-cyan-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-cyan-700 backdrop-blur-xl shadow-md">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-grow flex-col p-6 md:p-8">
          {/* Brand & Model */}
          <div className="mb-4 flex flex-wrap gap-2">
            {product.brand && (
              <span className="rounded-lg bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                Brand: {product.brand}
              </span>
            )}
            {product.model && (
              <span className="rounded-lg bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Model: {product.model}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-bold text-cyan-950 transition-all duration-300 group-hover:text-cyan-600 md:text-2xl">
            {product.title}
          </h3>

          {/* Description */}
          <p className="mt-3 flex-grow text-sm leading-7 text-cyan-900/70 line-clamp-3">
            {product.description ||
              product.desc ||
              "Biomedical equipment selected for the working demands of hospitals, laboratories, and diagnostic facilities."}
          </p>

          {/* Bottom */}
          <div className="mt-6 flex flex-col gap-4 border-t border-cyan-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100">
                <MapPin size={15} />
              </div>
              <span>
                {city
                  ? `Available in ${city}`
                  : "Available Across India"}
              </span>
            </div>

            {/* Button */}
            <Link href={detailUrl}>
              <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">
                <span>Get Quote</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal card layout (layout === "list") for Catalog listing
  return (
    <div
      id={product.slug}
      className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 w-full min-w-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_180px] gap-5 lg:gap-8 items-center">
        {/* Image */}
        <div className="relative h-[180px] sm:h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50">
          <img
            src={imageUrl}
            alt={`${product.title} biomedical equipment`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-5"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            {product.title}
          </h3>
          <p className="mt-4 text-slate-600 leading-8">
            {product.description ||
              product.desc ||
              "Biomedical equipment selected for the working demands of hospitals, laboratories, and diagnostic facilities."}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 border border-indigo-100 rounded-xl p-4 hover:border-fuchsia-200 transition">
              <p className="text-xs uppercase text-indigo-500 font-semibold tracking-wider">Brand</p>
              <p className="font-semibold mt-1">{product.brand || "N/A"}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 border border-indigo-100 rounded-xl p-4 hover:border-fuchsia-200 transition">
              <p className="text-xs uppercase text-indigo-500 font-semibold tracking-wider">Model</p>
              <p className="font-semibold mt-1">{product.model || "N/A"}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 border border-indigo-100 rounded-xl p-4 hover:border-fuchsia-200 transition">
              <p className="text-xs uppercase text-indigo-500 font-semibold tracking-wider">Instrument</p>
              <p className="font-semibold mt-1">{product.instrument || "N/A"}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 border border-indigo-100 rounded-xl p-4 hover:border-fuchsia-200 transition">
              <p className="text-xs uppercase text-indigo-500 font-semibold tracking-wider">Category</p>
              <p className="font-semibold mt-1">{product.category}</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center lg:justify-end">
          <Link
            href={
              resolvedDistrict
                ? `/${resolvedDistrict}/items/${product.slug}`
                : `/items/${product.slug}`
            }
            className="group relative inline-flex min-w-[180px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 px-8 py-5 font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,165,233,0.35)]"
          >
            {/* Shine Effect */}
            <span className="absolute inset-0 -translate-x-full !text-white bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-3 !text-white">
              <span className="!text-white text-base font-semibold sm:text-lg">
                Get Quote
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
