"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
} from "lucide-react";

// Max dimension width for standard hero banners
const BANNER_MAX_WIDTH = "1900px";

export default function HeroSection({ city = "", initialData = null }) {
  // =========================================================================
  // 1. DYNAMIC FIRESTORE DATA & REALTIME SYNC (websites/glucometersin/pages/home)
  // =========================================================================
  const [data, setData] = useState(initialData);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialData);

  // Parse Firestore Data into standard media items (handling media array, images, videos, imageUrl, videoUrl)
  const parseMediaList = useCallback((d) => {
    const list = [];
    if (Array.isArray(d?.media) && d.media.length > 0) {
      d.media.forEach((item, idx) => {
        const url = typeof item === "string" ? item : item.url;
        const type =
          item.type ||
          (url?.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? "video" : "image");
        if (url) {
          list.push({
            id: item.id || `media-${idx}`,
            type,
            url,
            name: item.name || `Slide ${idx + 1}`,
          });
        }
      });
    } else {
      // Images array / single
      if (Array.isArray(d?.images) && d.images.length > 0) {
        d.images.forEach((url, idx) => {
          if (url) list.push({ id: `img-${idx}`, type: "image", url });
        });
      } else if (d?.imageUrl || d?.image) {
        const img = d.imageUrl || d.image;
        if (img) list.push({ id: `img-0`, type: "image", url: img });
      }

      // Videos array / single
      if (Array.isArray(d?.videos) && d.videos.length > 0) {
        d.videos.forEach((vUrl, idx) => {
          if (vUrl) list.push({ id: `vid-${idx}`, type: "video", url: vUrl });
        });
      } else if (d?.videoUrl) {
        list.push({ id: `vid-0`, type: "video", url: d.videoUrl });
      }
    }

    // Default fallback banner if no media configured
    if (list.length === 0) {
      list.push({
        id: "default-slide-1",
        type: "image",
        url: "/biomedical-lab-banner.png",
        name: "Biomedical Equipment & Lab Essentials",
      });
    }
    return list;
  }, []);

  // Sync initialData prop if it changes
  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  // Real-time listener & client-side mount fetch from Firestore
  useEffect(() => { let isMounted=true; fetch("/api/site-data?page=home",{cache:"no-store"}).then(r=>r.json()).then(d=>{if(isMounted){setData(d);setIsLoading(false);}}).catch(()=>{if(isMounted)setIsLoading(false);}); const timer=setInterval(()=>fetch("/api/site-data?page=home",{cache:"no-store"}).then(r=>r.json()).then(d=>{if(isMounted)setData(d)}).catch(()=>{}),3000); return()=>{isMounted=false;clearInterval(timer);}; }, []);

  const mediaList = useMemo(() => parseMediaList(data), [data, parseMediaList]);
  const safeActiveSlide = activeSlide < mediaList.length ? activeSlide : 0;
  const currentMedia = mediaList[safeActiveSlide] || mediaList[0];

  // Auto-play timer for Carousel (runs when > 1 slide)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || mediaList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mediaList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, mediaList.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % mediaList.length);
  };

  // =========================================================================
  // 2. DYNAMIC CONTENT & SMART LINKS RESOLUTION
  // =========================================================================
  const heroTitle =
    data?.title ||
    "Biomedical Equipment, Diagnostic Systems & Lab Essentials";

  const heroDescription =
    data?.description ||
    "A broad catalogue for hospitals, laboratories, clinics, pharmacies, collection centres, and institutional buyers — covering diagnostic instruments, reagents, consumables, monitoring devices, and everyday laboratory supplies.";

  const button1Text =
    data?.button1Text !== undefined &&
    data?.button1Text !== null &&
    data?.button1Text !== ""
      ? data.button1Text
      : "Browse Biomedical Range";

  const button2Text =
    data?.button2Text !== undefined &&
    data?.button2Text !== null &&
    data?.button2Text !== ""
      ? data.button2Text
      : "Discuss Your Requirement";

  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  // Helper to parse dynamic links (handles external URLs, internal relative paths, and city/district routing)
  const resolveLink = (linkProp, defaultFallback) => {
    const raw =
      linkProp && typeof linkProp === "string" && linkProp.trim()
        ? linkProp.trim()
        : defaultFallback;

    if (!raw) return { href: "/", isExternal: false };

    // External link check
    if (/^(https?:\/\/|tel:|mailto:|wa\.me)/i.test(raw)) {
      return { href: raw, isExternal: true };
    }

    // Relative internal path
    const cleanPath = raw.startsWith("/") ? raw : `/${raw}`;
    const finalHref = districtSlug ? `/${districtSlug}${cleanPath}` : cleanPath;
    return { href: finalHref, isExternal: false };
  };

  const btn1 = resolveLink(data?.button1Link, "/items");
  const btn2 = resolveLink(data?.button2Link, "/contact");

  // =========================================================================
  // 3. RENDER HERO BANNER / CAROUSEL (100% BRIGHT & VIBRANT IMAGE)
  // =========================================================================
  return (
    <section
      className="relative isolate w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[530px] overflow-hidden bg-white"
      style={{ maxWidth: BANNER_MAX_WIDTH, margin: "0 auto" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Hero Carousel Banner"
    >
      <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[530px] w-full flex items-center justify-between">
        {/* Dynamic Background Slides (100% Full Opacity & Clarity) */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia?.url || safeActiveSlide}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              {currentMedia?.type === "video" ? (
                <video
                  src={currentMedia.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover object-center lg:object-right"
                />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={currentMedia?.url || "/biomedical-lab-banner.png"}
                    alt={currentMedia?.name || heroTitle}
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className="object-cover object-center lg:object-right"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Soft Left Light Gradients — Keeps image 100% bright while text stays crystal clear */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 via-[48%] sm:via-[44%] to-transparent pointer-events-none" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50/25 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content Container */}
        <div className="container-custom relative z-10 w-full py-10 sm:py-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[680px]"
          >
            {/* Trust Badge */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur-md">
              <ShieldCheck size={16} className="text-cyan-600 shrink-0" />
              <span>Biomedical Supply, Without the Narrow Focus</span>
              {mediaList.length > 1 && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-800 border border-cyan-200">
                  <Layers size={10} /> {safeActiveSlide + 1}/{mediaList.length}
                </span>
              )}
            </div>

            {/* Dynamic Hero Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.14] tracking-tight text-cyan-950">
              {isLoading ? (
                <div className="animate-pulse space-y-2.5">
                  <div className="h-10 w-[90%] rounded-xl bg-cyan-100" />
                  <div className="h-10 w-[65%] rounded-xl bg-cyan-100" />
                </div>
              ) : (
                <>
                  {heroTitle}
                  {city && (
                    <>
                      <br />
                      <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-400 bg-clip-text text-2xl sm:text-3xl font-bold text-transparent lg:text-4xl">
                        in {city}
                      </span>
                    </>
                  )}
                </>
              )}
            </h1>

            {/* Dynamic Hero Description */}
            {isLoading ? (
              <div className="mt-3.5 animate-pulse space-y-2">
                <div className="h-3.5 w-full rounded bg-cyan-100" />
                <div className="h-3.5 w-[80%] rounded bg-cyan-100" />
              </div>
            ) : (
              <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-6 sm:leading-7 text-cyan-900/80">
                {heroDescription}
                {city && (
                  <>
                    {" "}
                    across{" "}
                    <strong className="text-cyan-700 font-semibold">{city}</strong>
                  </>
                )}
              </p>
            )}

            {/* Dynamic Buttons (Text + Links from Admin) */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              {button1Text &&
                (btn1.isExternal ? (
                  <a
                    href={btn1.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-md shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/50"
                  >
                    <span>{button1Text}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                ) : (
                  <Link href={btn1.href}>
                    <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-md shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/50">
                      <span>{button1Text}</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                ))}

              {button2Text &&
                (btn2.isExternal ? (
                  <a
                    href={btn2.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-cyan-200 bg-white/90 px-6 py-3 font-semibold text-cyan-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-md"
                  >
                    <span>{button2Text}</span>
                  </a>
                ) : (
                  <Link href={btn2.href}>
                    <button className="rounded-xl border border-cyan-200 bg-white/90 px-6 py-3 font-semibold text-cyan-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-md">
                      <span>{button2Text}</span>
                    </button>
                  </Link>
                ))}
            </div>

            {/* Quick Credibility Stats */}
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-3 sm:gap-4">
              <div className="rounded-xl border border-cyan-100 bg-white/85 px-4 py-2 sm:py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-2xl font-bold text-transparent">
                  10+
                </h3>
                <p className="mt-0.5 text-xs font-medium text-cyan-900/70">
                  Years in Biomedical Supply
                </p>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-white/85 px-4 py-2 sm:py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-2xl font-bold text-transparent">
                  500+
                </h3>
                <p className="mt-0.5 text-xs font-medium text-cyan-900/70">
                  Product Lines & Essentials
                </p>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-white/85 px-4 py-2 sm:py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-2xl font-bold text-transparent">
                  100%
                </h3>
                <p className="mt-0.5 text-xs font-medium text-cyan-900/70">
                  Sourcing Support
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Controls (Displayed when > 1 slide) */}
        {mediaList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-cyan-200 bg-white/85 text-cyan-900 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-white hover:text-cyan-600"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-cyan-200 bg-white/85 text-cyan-900 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-white hover:text-cyan-600"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Bottom Status Bar: Play/Pause, Pagination Dots, Slide Counter */}
            <div className="absolute bottom-3.5 right-3.5 sm:right-7 z-20 flex items-center gap-2.5 rounded-full border border-cyan-200 bg-white/90 px-3.5 py-1.5 shadow-md backdrop-blur-lg">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center justify-center text-cyan-700 hover:text-cyan-950 transition-colors"
                title={isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
              >
                {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
              <div className="h-2.5 w-[1px] bg-cyan-200" />
              <div className="flex items-center gap-1.5">
                {mediaList.map((item, dotIdx) => (
                  <button
                    key={item.id || dotIdx}
                    type="button"
                    onClick={() => setActiveSlide(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      safeActiveSlide === dotIdx
                        ? "w-6 bg-cyan-600"
                        : "w-1.5 bg-cyan-200 hover:bg-cyan-400"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-cyan-800 ml-1">
                {safeActiveSlide + 1}/{mediaList.length}
              </span>
            </div>
          </>
        )}

        {/* Soft Bottom Fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-10 bg-gradient-to-t from-white/60 to-transparent" />
      </div>
    </section>
  );
}