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
      title: "Instrument Sourcing",
      description:
        "Locate analyzers, readers, monitors, and other instruments by use case and key specifications.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Bench & Collection Supplies",
      description:
        "Cover tubes, pipette accessories, collection items, disposables, and everyday bench supplies.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Selection Desk",
      description:
        "Clarify model, capacity, throughput, add-ons, operating needs, and differences between listings.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Bulk & Institutional Orders",
      description:
        "Prepare single-unit or larger-quantity requests for hospitals, clinics, pharmacies, distributors, and departments.",
    }
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />

      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

      <div className="container-custom relative z-10">

        {/* Title */}
        <SectionTitle
          badge="Catalogue Assistance"
          title="More Than a Single Product Segment"
          description="Use the catalogue for instruments, test products, disposables, monitoring devices, reagents, accessories, and other healthcare purchasing needs."
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