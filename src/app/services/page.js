"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  ArrowRight
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[30px] border border-cyan-100 bg-white/70 p-10 backdrop-blur-xl shadow-[0_12px_40px_rgba(8,145,178,0.08)]"
                >

                  {/* Icon Skeleton */}
                  <div className="mb-8 h-20 w-20 animate-pulse rounded-3xl bg-cyan-100" />

                  {/* Title Skeleton */}
                  <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-cyan-100" />

                  {/* Description Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 animate-pulse rounded bg-cyan-100" />
                    <div className="h-4 w-11/12 animate-pulse rounded bg-cyan-100" />
                    <div className="h-4 w-8/12 animate-pulse rounded bg-cyan-100" />
                  </div>

                </div>
              ))
              : services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />
              ))}

          </div>

        </div>

      </section>

      {/* Working Process */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100"
              >
                <span className="text-5xl font-bold text-sky-100">
                  {item.step}
                </span>

                <h3 className="text-2xl font-semibold mt-5">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}