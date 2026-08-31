"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Clinic Director",
      review:
        "Sourcing reliable glucometers from Raj Biosis has made blood sugar tracking simple and accurate for our clinic.",
    },
    {
      name: "Amit Sharma",
      role: "Pharmacy Manager",
      review:
        "Their digital blood glucose monitors are incredibly easy to calibrate. Excellent customer support!",
    },
    {
      name: "Neha Verma",
      role: "Wellness Coordinator",
      review:
        "We purchased bulk diabetes testing kits for our wellness drive. The accuracy and packaging were top notch.",
    }
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Chosen by diagnostic teams, laboratories, healthcare organizations, and institutional users."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (
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
              className="group relative overflow-hidden rounded-[32px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_20px_60px_rgba(8,145,178,0.18)]"
            >

              {/* Quote Glow */}
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-200/20 blur-3xl" />

              {/* Quote Icon */}
              <div className="mb-5 text-5xl font-bold leading-none text-cyan-200">
                “
              </div>

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-lg text-amber-400">
                ★★★★★
              </div>

              {/* Review */}
              <p className="italic leading-8 text-cyan-900/70">
                "{item.review}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-lg font-bold text-white shadow-lg shadow-cyan-300/40">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-cyan-950">
                    {item.name}
                  </h4>

                  <p className="text-cyan-700">
                    {item.role}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}