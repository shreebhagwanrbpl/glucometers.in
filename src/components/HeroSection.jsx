"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
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
          doc(db, "websites", "centralbiomedicals", "pages", "home")
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
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 backdrop-blur-md px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm mb-7">
            <ShieldCheck size={18} className="text-cyan-600" />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-cyan-950 tracking-tight">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 rounded-xl bg-cyan-100 w-[80%]" />
                <div className="h-12 rounded-xl bg-cyan-100 w-[60%]" />
                <div className="h-12 rounded-xl bg-cyan-100 w-[70%]" />
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

          {/* Description */}
          {loading ? (
            <div className="mt-7 animate-pulse space-y-3">
              <div className="h-4 rounded bg-cyan-100 w-full" />
              <div className="h-4 rounded bg-cyan-100 w-[90%]" />
              <div className="h-4 rounded bg-cyan-100 w-[75%]" />
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

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {loading ? (
              <>
                <div className="h-12 w-44 animate-pulse rounded-xl bg-cyan-100" />
                <div className="h-12 w-36 animate-pulse rounded-xl bg-cyan-100" />
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 px-7 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">
                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="rounded-xl border border-cyan-200 bg-white/80 px-7 py-4 font-semibold text-cyan-700 backdrop-blur transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-6">

            <div className="rounded-2xl border border-cyan-100 bg-white/70 px-6 py-5 shadow-md backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                10+
              </h3>
              <p className="mt-1 text-cyan-900/70">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-100 bg-white/70 px-6 py-5 shadow-md backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                500+
              </h3>
              <p className="mt-1 text-cyan-900/70">
                Products Delivered
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-100 bg-white/70 px-6 py-5 shadow-md backdrop-blur-md transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
                100%
              </h3>
              <p className="mt-1 text-cyan-900/70">
                Quality Assurance
              </p>
            </div>

          </div>

        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* Main Image Card */}
          <div className="rounded-[40px] border border-cyan-100/70 bg-white/50 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.15)]">

            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="h-[350px] w-full rounded-[30px] object-cover object-[20%_center] sm:h-[450px] lg:h-[550px]"
            />

          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute -left-10 top-10 hidden lg:flex items-center gap-4 rounded-3xl border border-cyan-100 bg-white/70 px-5 py-4 backdrop-blur-xl shadow-[0_15px_40px_rgba(8,145,178,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,145,178,0.25)]"
            style={{ marginTop: "-27px" }}
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40">
              <Microscope size={26} />
            </div>

            <div>
              <h4 className="font-bold text-cyan-950">
                Modern Labs
              </h4>

              <p className="text-sm text-cyan-900/70">
                Precision Equipment
              </p>
            </div>

          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-8 bottom-10 hidden lg:flex items-center gap-4 rounded-3xl border border-cyan-100 bg-white/70 px-5 py-4 backdrop-blur-xl shadow-[0_15px_40px_rgba(8,145,178,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,145,178,0.25)]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40">
              <BadgeCheck size={26} />
            </div>

            <div>
              <h4 className="font-bold text-cyan-950">
                Trusted Quality
              </h4>

              <p className="text-sm text-cyan-900/70">
                Certified Solutions
              </p>
            </div>

          </div>

          {/* Glow Effects */}
          <div className="absolute -top-10 -right-10 -z-10 h-44 w-44 rounded-full bg-cyan-300/30 blur-[90px]" />

          <div className="absolute -bottom-10 -left-10 -z-10 h-52 w-52 rounded-full bg-sky-300/20 blur-[100px]" />

        </motion.div>

      </div>
    </section>
  );
}