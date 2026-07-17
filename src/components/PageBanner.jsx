"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ECFEFF] via-[#F8FCFD] to-[#E0F7FA] py-28 lg:py-36">

      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/25 blur-[130px]" />

      <div className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-[150px]" />

      {/* Glass Circle */}
      <div className="absolute top-16 right-24 hidden lg:block h-32 w-32 rounded-full border border-white/40 bg-white/20 backdrop-blur-xl" />

      <div className="absolute bottom-12 left-24 hidden lg:block h-20 w-20 rounded-full border border-cyan-200/50 bg-white/30 backdrop-blur-xl" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-5xl text-center"
        >

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md">
            Premium Biomedical Solutions
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-cyan-950 lg:text-7xl">
            {title}
          </h1>

          {/* Gradient Line */}
          <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-cyan-900/70">
            {subtitle}
          </p>

        </motion.div>

      </div>

    </section>
  );
}