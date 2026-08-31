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
      title: "Glucometer Supply",
      description:
        "Providing automatic blood glucose monitors and digital meters for clinics and homes.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Diabetes Tracking Kits",
      description:
        "Sourcing complete diabetes kits including lancing devices, journals, and storage bags.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Calibration Sourcing",
      description:
        "Prompt accuracy calibration guidance and vendor warranty checks for digital glucose meters.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Clinical Training",
      description:
        "Setup tutorials and patient operation guidance to ensure proper home glucose tracking.",
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
          badge="Glucose Support Services"
          title="Customized GLUCOMETERS Technical Services"
          description="Sourcing customized diagnostics equipment solutions and technical support designed around professional glucometers requirements."
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