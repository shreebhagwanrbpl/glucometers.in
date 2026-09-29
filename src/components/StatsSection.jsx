"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years in Distribution",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Catalogue Listings",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Buyer Enquiries",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Category Coverage",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        <div className="rounded-[40px] border border-cyan-100 bg-white/70 p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)] lg:p-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
                className="group text-center"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {item.icon}
                </div>

                {/* Number */}
                <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-4xl font-extrabold text-transparent lg:text-5xl">
                  {item.number}
                </h3>

                {/* Label */}
                <p className="mt-3 text-lg font-medium text-cyan-900/70">
                  {item.label}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}