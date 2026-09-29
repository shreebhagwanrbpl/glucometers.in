"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-sky-50 py-28 lg:py-36">

      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[140px]" />

      <div className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-[160px]" />

      {/* Decorative Glass Circles */}
      <div className="absolute top-16 right-24 hidden h-32 w-32 rounded-full border border-cyan-100 bg-white/40 backdrop-blur-2xl lg:block" />

      <div className="absolute bottom-12 left-24 hidden h-20 w-20 rounded-full border border-sky-100 bg-white/40 backdrop-blur-2xl lg:block" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-cyan-100 bg-white/80 px-5 py-2 text-sm font-semibold text-cyan-700 shadow-lg backdrop-blur-xl">
            Biomedical Catalogue & Procurement
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">

            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </span>

          </h1>

          {/* Gradient Divider */}
          <div className="mx-auto mt-7 h-1.5 w-36 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-400" />

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600">
            {subtitle}
          </p>

        </motion.div>

      </div>

    </section>
  );
}