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
import { useState, useEffect } from "react";

export default function ServicesClient() {
  const [openFaq, setOpenFaq] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/site-data?page=services", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.services) && d.services.length > 0) {
          setServices(d.services);
        }
      })
      .catch((e) => console.log("Services fetch error:", e));
  }, []);

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
    { id: "equipment", title: "Equipment & Instrument Sourcing", description: "Source laboratory analyzers, diagnostic instruments, monitoring equipment, and related systems according to application, specification, brand, and quantity.", iconName: "Microscope" },
    { id: "workflow", title: "Lab Workflow Planning", description: "For new or expanding facilities, discuss equipment requirements, workflow considerations, product combinations, and the practical supplies needed around an instrument.", iconName: "FlaskConical" },
    { id: "guidance", title: "Product & Specification Guidance", description: "Help buyers interpret model numbers, capacity, throughput, automation, dimensions, and intended application when comparing biomedical equipment.", iconName: "ShieldCheck" },
    { id: "after-sales", title: "After-Sales Coordination", description: "For applicable equipment, enquiries can cover service requirements, accessories, replacement needs, maintenance arrangements, and manufacturer support.", iconName: "Wrench" },
    { id: "accessories", title: "Replacement & Accessory Enquiries", description: "Identify compatible accessories, recurring consumables, replacement items, or related products when a biomedical system requires additional components.", iconName: "Activity" },
    { id: "procurement", title: "Procurement Assistance", description: "Support for hospitals, laboratories, clinics, pharmacies, distributors, and institutional buyers preparing single-unit or bulk product enquiries.", iconName: "Stethoscope" },
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const renderIcon = (service, index) => {
    if (service.iconName) {
      return getIcon(service.iconName);
    }
    return icons[index % icons.length];
  };

  const machineryCategories = [
    {
      title: "Hematology & Cell Analysis",
      details: "Products and accessories used for blood-cell analysis, routine hematology workflows, and related laboratory operations.",
      brands: "Mindray, Sysmex, Erba, Horiba",
      uptime: "99.8%"
    },
    {
      title: "Clinical Chemistry",
      details: "Equipment and supporting supplies for chemistry testing, sample processing, reagent handling, and routine clinical laboratory work.",
      brands: "Erba, Roche, Abbott, Mindray",
      uptime: "99.5%"
    },
    {
      title: "Coagulation & Urinalysis",
      details: "Product groups supporting coagulation testing, urine analysis, sample handling, and associated laboratory consumables.",
      brands: "Sysmex, Erba, Roche",
      uptime: "99.9%"
    },
    {
      title: "Immunology & Specialized Testing",
      details: "Readers, analyzers, kits, and supporting products for immunology and other specialized diagnostic workflows.",
      brands: "Robonik, Bio-Rad, Erba",
      uptime: "99.7%"
    }
  ];

  const faqs = [
    {
      question: "How do I choose between similar biomedical products?",
      answer: "Start with the intended application, required capacity or throughput, sample type, workflow, compatibility, and manufacturer specifications. The product details can then be used to narrow the shortlist."
    },
    {
      question: "Can I enquire about more than one category at once?",
      answer: "Yes. The catalogue is designed for multi-item and multi-category requirements, so a buyer can include equipment, reagents, consumables, accessories, or monitoring products in the same enquiry."
    },
    {
      question: "What information should I include in an equipment enquiry?",
      answer: "A model number, brand, application, required quantity, capacity, throughput, or a photo of the specification plate can make product matching much easier."
    },
    {
      question: "Are consumables and accessories part of the catalogue too?",
      answer: "Yes. Alongside instruments, the range includes diagnostic products, reagents, test kits, sample-collection items, laboratory accessories, monitoring devices, and other recurring supplies."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Biomedical Procurement & Support"
        subtitle="Practical assistance for selecting, sourcing, and enquiring about biomedical equipment, diagnostic products, laboratory consumables, monitoring devices, and related supplies."
      />

      {/* Services Grid Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="How We Assist"
            title="Support Across Biomedical Purchasing"
            description="The service layer is designed for varied buyers — from a laboratory adding one instrument to an institution coordinating several product categories."
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
            badge="Equipment Areas"
            title="Common Equipment Areas in the Catalogue"
            description="Explore equipment groups by the work they perform, then review the individual model and application information available for each product."
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
            badge="A Simple Buying Path"
            title="From Requirement to Enquiry"
            description="A clear requirement helps narrow a large catalogue into products that are easier to compare and enquire about."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Define the Need",
                desc: "Share the application, product category, preferred brand, model, quantity, or key specification you already know.",
              },
              {
                step: "02",
                title: "Shortlist Options",
                desc: "Review suitable catalogue entries and related accessories based on the intended workflow and available specifications.",
              },
              {
                step: "03",
                title: "Confirm the Order Details",
                desc: "Finalize quantity, delivery expectations, compatibility, and any additional product or support requirements before procurement.",
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
            badge="Buyer Questions"
            title="Questions About Biomedical Procurement"
            description="A few practical answers for buyers comparing equipment, consumables, support requirements, and catalogue categories."
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