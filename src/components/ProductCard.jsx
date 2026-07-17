"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, city }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const pathname = usePathname();

  // Extract district from URL path to preserve district routing (without navigation reset)
  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "items", "contact"];
  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const detailUrl = district
    ? `/${district}/items/${product.slug}`
    : `/items/${product.slug}`;

  const imageUrl = product.images?.[0] || product.image || "/placeholder.jpg";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-cyan-100 bg-white/70 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_25px_60px_rgba(8,145,178,0.18)]">

      {/* Product Image */}
      <div className="relative flex aspect-video overflow-hidden bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF] p-6 sm:aspect-square md:aspect-video lg:aspect-[4/3]">

        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-cyan-100" />
        )}

        <img
          src={imageUrl}
          alt={product.title}
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

        {/* Category Badge */}
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
            "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
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
