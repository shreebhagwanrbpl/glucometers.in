"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Equipment",
      description:
        "Advanced diagnostic systems designed for accurate and efficient healthcare testing.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Laboratory Solutions",
      description:
        "Reliable laboratory instruments and biomedical support for modern medical environments.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Maintenance Support",
      description:
        "Professional technical support and maintenance for biomedical systems.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Healthcare Consultation",
      description:
        "Expert guidance and consultation for healthcare and biomedical operations.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        {/* Title */}
        <SectionTitle
          badge="Our Services"
          title="Premium Diagnostic & Biomedical Services"
          description="Providing advanced healthcare technologies, laboratory systems, and trusted biomedical solutions for modern diagnostics."
          center
        />

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (
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
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}