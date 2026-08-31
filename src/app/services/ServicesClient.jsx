"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  HeartPulse
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServicesClient() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Microscope": return <Microscope size={30} />;
      case "FlaskConical": return <FlaskConical size={30} />;
      case "ShieldCheck": return <ShieldCheck size={30} />;
      case "Wrench": return <Wrench size={30} />;
      case "Activity": return <Activity size={30} />;
      case "Stethoscope": return <Stethoscope size={30} />;
      default: return <Microscope size={30} />;
    }
  };

  const fallbackServices = [
    {
      id: "diag-supply",
      title: "Diagnostic Equipment Supply",
      description: "Distribution of high-end CBC machines, hematology systems, biochemistry analyzers, and immunology readers from certified global manufacturers with full warranty support.",
      iconName: "Microscope"
    },
    {
      id: "lab-setup",
      title: "Laboratory Setup & Installation",
      description: "End-to-end planning, electrical/plumbing specifications, instrument layout, installation, and commissioning of new pathology labs and diagnostic clinics.",
      iconName: "FlaskConical"
    },
    {
      id: "calibration",
      title: "NABL Standard Calibration",
      description: "Regular, certified calibration services using reference materials traceable to national standards to ensure your diagnostic machinery yields highly precise readings.",
      iconName: "ShieldCheck"
    },
    {
      id: "amc-cmc",
      title: "Maintenance Contracts (AMC/CMC)",
      description: "Customized Annual Maintenance Contracts and Comprehensive Maintenance Contracts to protect your capital instruments and ensure maximum uptime.",
      iconName: "Wrench"
    },
    {
      id: "tech-repair",
      title: "Emergency Technical Repairs",
      description: "On-call field engineering support for hardware troubleshooting, diagnostic alignment, laser repairs, and replacement of original components.",
      iconName: "Activity"
    },
    {
      id: "staff-training",
      title: "Operator Training & Quality Control",
      description: "Hands-on instruction for laboratory technicians, including calibration cycles, reagent preparation, quality control charting, and device maintenance.",
      iconName: "Stethoscope"
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucometersin",
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

  const displayServices = services.length > 0 ? services : fallbackServices;

  const renderIcon = (service, index) => {
    if (service.iconName) {
      return getIcon(service.iconName);
    }
    return icons[index % icons.length];
  };

  const machineryCategories = [
    {
      title: "Hematology Analyzers",
      details: "Preventive maintenance, dilution calibration, laser/optical chamber alignment, clog clearing, and fluidic line replacements.",
      brands: "Mindray, Sysmex, Erba, Horiba",
      uptime: "99.8%"
    },
    {
      title: "Biochemistry Systems",
      details: "Photometer lamp replacements, temperature module calibration, probe cleaning, syringe alignment, and carousel calibration.",
      brands: "Erba, Roche, Abbott, Mindray",
      uptime: "99.5%"
    },
    {
      title: "Coagulation & Urine Analyzers",
      details: "Optical sensor calibration, incubator temperature adjustment, pump tube replacement, and board-level diagnostic checks.",
      brands: "Sysmex, Erba, Roche",
      uptime: "99.9%"
    },
    {
      title: "ELISA & Immunology Readers",
      details: "Filter calibration, plate carrier alignment, optical density checks, washer needle adjustments, and software integration.",
      brands: "Robonik, Bio-Rad, Erba",
      uptime: "99.7%"
    }
  ];

  const faqs = [
    {
      question: "How often should clinical diagnostic analyzers undergo calibration?",
      answer: "We recommend professional calibration every 3 to 6 months depending on daily sample volume and specific NABL/clinical guidelines. Daily control runs should also be maintained by laboratory technicians."
    },
    {
      question: "What is the difference between an AMC and a CMC contract?",
      answer: "An AMC (Annual Maintenance Contract) covers regular preventive maintenance checks and breakdown service charges. A CMC (Comprehensive Maintenance Contract) covers everything in the AMC plus the cost of all critical spare parts, optical sensors, and fluidic components."
    },
    {
      question: "What is the turnaround time (TAT) for emergency breakdown support?",
      answer: "Our biomedical engineers provide telephone or remote assistance within 2 hours. If an on-site visit is required, we dispatch engineers to arrive within 24 hours for major cities and 48 hours for remote locations."
    },
    {
      question: "Are the calibration certifications provided compliant with accreditation bodies?",
      answer: "Yes, our calibration parameters and certifications are prepared in compliance with standard NABL guidelines, using traceable reference equipment to satisfy regulatory inspections."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Diagnostic & Biomedical Services"
        subtitle="Ensuring clinical precision and maximum laboratory uptime through certified calibration, customized maintenance agreements, and responsive field engineering."
      />

      {/* Services Grid Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Our Expertise"
            title="Professional Solutions for Medical Laboratories"
            description="We support pathology departments, diagnostic centers, and clinics with expert technical assistance, ensuring precise diagnostic outputs."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array(6)
                  .fill(null)
                  .map((_, index) => <ServiceCard key={index} loading={true} />)
              : displayServices.map((service, index) => (
                  <ServiceCard
                    key={service.id || index}
                    icon={renderIcon(service, index)}
                    title={service.title}
                    description={service.description}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Machinery Support Categories */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Machinery Supported"
            title="Expert Maintenance for Leading Analyzer Categories"
            description="Our company-trained engineers specialize in the service, maintenance, and software diagnostics of complex clinical analyzers."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {machineryCategories.map((cat, index) => (
              <div 
                key={index}
                className="rounded-3xl border border-slate-100 bg-[#F8FCFD] p-8 hover:border-cyan-200 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-cyan-950">{cat.title}</h3>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
                    {cat.uptime} Uptime
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-cyan-900/70">
                  {cat.details}
                </p>
                <div className="mt-6 border-t border-slate-200/60 pt-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-950/40 uppercase tracking-wider">Common Brands</span>
                  <span className="text-xs font-bold text-cyan-700">{cat.brands}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <SectionTitle
            badge="How We Work"
            title="Streamlined Service Execution"
            description="We follow a systematic workflow to respond quickly, resolve issues correctly, and keep your diagnostics laboratory operating smoothly."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Inquiry & Assessment",
                desc: "Identify issues via remote diagnostic screening or analyze equipment requirements for new laboratory installations.",
              },
              {
                step: "02",
                title: "Engineering Dispatch",
                desc: "Deploy certified biomedical technicians with calibrated tools and authentic spare parts directly to your diagnostic facility.",
              },
              {
                step: "03",
                title: "Testing & Validation",
                desc: "Run rigorous standard test cycles, perform quality control validation runs, and issue standard calibration reports.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-5xl font-extrabold text-cyan-100">
                  {item.step}
                </span>

                <h3 className="text-xl font-bold mt-5 text-cyan-950">
                  {item.title}
                </h3>

                <p className="text-sm text-cyan-900/60 mt-4 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ Section */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="FAQs"
            title="Service & Support Questions"
            description="Everything you need to know about our calibration standards, servicing intervals, and maintenance plans."
            center
          />

          <div className="mt-16 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="rounded-2xl border border-cyan-50 bg-[#F8FCFD] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-cyan-50/50 transition-colors"
                  >
                    <span className="font-bold text-cyan-950 text-base md:text-lg">{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-cyan-600 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                      }`} 
                    />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-60 border-t border-cyan-100/30" : "max-h-0"
                    } overflow-hidden`}
                  >
                    <p className="p-6 text-sm md:text-base leading-7 text-cyan-900/70 bg-white">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}