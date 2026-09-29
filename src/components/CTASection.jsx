"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] border border-cyan-200/50 bg-gradient-to-r from-[#0891B2] via-[#06B6D4] to-[#67E8F9] p-10 text-white shadow-[0_30px_80px_rgba(8,145,178,0.25)] lg:p-20"
        >

          {/* Glow */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-[120px]" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/20 blur-[120px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur-md">
                Plan Your Requirement
              </span>

              <h2 className="text-4xl font-extrabold leading-tight lg:text-6xl">Need Biomedical Products for a Specific Application?</h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">Tell us what you need — equipment, diagnostic products, laboratory consumables, monitoring devices, reagents, or a bulk requirement — and we can help you identify the relevant catalogue options.</p>

            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] border border-white/30 bg-white/70 p-8 text-cyan-950 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.18)]">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40">
                  <PhoneCall size={30} />
                </div>

                <h3 className="text-2xl font-bold">
                  Let's Talk
                </h3>

                <p className="mt-3 leading-7 text-cyan-900/70">
                  Share your application, preferred brand, model, quantity, or specification. Our team can help you move from a broad requirement to a practical product enquiry.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-6 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">
                      Contact Us

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </Link>

                  <a
                    href="tel:+919876543210"
                    className="rounded-2xl border border-cyan-200 bg-white/80 px-6 py-4 text-center font-semibold text-cyan-700 backdrop-blur transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg"
                  >
                    Call Now
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}