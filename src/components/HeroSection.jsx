"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucometersin",
            "pages",
            "home"
          )
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug
      ? `/${districtSlug}${path}`
      : path;
  };

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-white">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0 -z-20">

        <Image
          src="/biomedical-lab-banner.png"
          alt="Modern Biomedical Laboratory"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right"
        />

      </div>

      {/* =====================================================
          LEFT WHITE OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/98 via-[45%] to-white/20" />

      {/* =====================================================
          SOFT CYAN OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50/30 via-transparent to-sky-100/10" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-custom relative z-10 min-h-[680px] flex items-center">

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full max-w-[680px] py-24 lg:py-20"
        >

          {/* =================================================
              BADGE
          ================================================= */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/85 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm backdrop-blur-md">

            <ShieldCheck
              size={18}
              className="text-cyan-600"
            />

            Trusted Biomedical Systems

          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-cyan-950 sm:text-5xl lg:text-6xl">

            {loading ? (
              <div className="animate-pulse space-y-4">

                <div className="h-14 w-[90%] rounded-xl bg-cyan-100" />

                <div className="h-14 w-[75%] rounded-xl bg-cyan-100" />

                <div className="h-14 w-[85%] rounded-xl bg-cyan-100" />

              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />

                    <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent lg:text-4xl">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}

          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {loading ? (
            <div className="mt-7 animate-pulse space-y-3">

              <div className="h-4 w-full rounded bg-cyan-100" />

              <div className="h-4 w-[90%] rounded bg-cyan-100" />

              <div className="h-4 w-[75%] rounded bg-cyan-100" />

            </div>
          ) : (
            <p className="mt-7 max-w-xl text-lg leading-8 text-cyan-900/75">

              {heroData.description}

              {city && (
                <>
                  {" "}
                  across{" "}
                  <strong className="text-cyan-700">
                    {city}
                  </strong>
                </>
              )}

            </p>
          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            {loading ? (
              <>
                <div className="h-14 w-48 animate-pulse rounded-xl bg-cyan-100" />

                <div className="h-14 w-40 animate-pulse rounded-xl bg-cyan-100" />
              </>
            ) : (
              <>
                <Link href={makeLink("/items")}>

                  <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-7 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">

                    {heroData.button1Text ||
                      "Explore Products"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>

                </Link>

                <Link href={makeLink("/contact")}>

                  <button className="rounded-xl border border-cyan-200 bg-white/85 px-7 py-4 font-semibold text-cyan-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg">

                    {heroData.button2Text ||
                      "Contact Us"}

                  </button>

                </Link>
              </>
            )}

          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mt-14 flex flex-wrap gap-4 sm:gap-5">

            {/* Stat 1 */}
            <div className="rounded-2xl border border-cyan-100 bg-white/80 px-5 py-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                10+
              </h3>

              <p className="mt-1 text-sm font-medium text-cyan-900/70">
                Years Experience
              </p>

            </div>

            {/* Stat 2 */}
            <div className="rounded-2xl border border-cyan-100 bg-white/80 px-5 py-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                500+
              </h3>

              <p className="mt-1 text-sm font-medium text-cyan-900/70">
                Products Delivered
              </p>

            </div>

            {/* Stat 3 */}
            <div className="rounded-2xl border border-cyan-100 bg-white/80 px-5 py-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                100%
              </h3>

              <p className="mt-1 text-sm font-medium text-cyan-900/70">
                Quality Assurance
              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-24 bg-gradient-to-t from-white/40 to-transparent" />

    </section>
  );
}