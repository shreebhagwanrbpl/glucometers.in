"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description: "High-precision digital glucose sensors designed for consistent blood sugar readings and daily clinical safety.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description: "Quality-tested glucose meters manufactured for reliable diagnostic accuracy and long-term diabetes care.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description: "Supporting home users and clinics in adopting reliable blood sugar tracking devices with direct warranty support.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description: "Prompt customer support and calibration guidance for all blood glucose monitoring kits and diabetes tools.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Buyers Choose Our Glucose Solutions"
          title="Accurate Glucose Monitoring Systems"
          description="We offer easy-to-use digital blood sugar monitors, original diabetes care kits, and responsive customer guidance."
          center
        />

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_20px_60px_rgba(8,145,178,0.18)]"
            >

              {/* Glow */}
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-200/20 blur-3xl" />

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-cyan-950 transition-colors duration-300 group-hover:text-cyan-600">
                {item.title}
              </h3>

              {/* Description */}
              <p className="leading-8 text-cyan-900/70">
                {item.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}