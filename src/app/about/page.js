import Image from "next/image";
import { 
  Award, 
  ShieldCheck, 
  Activity, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Building,
  Wrench,
  Clock,
  Heart
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export const metadata = {
  title: "About Our Medical Equipment Division | Biomedical & Laboratory Diagnostic Supplier",
  description: "Learn about Raj Biosis, a trusted name in medical diagnostic and laboratory technologies, providing CBC machines, biochemistry analyzers, and test kits in India.",
  alternates: {
    canonical: "https://glucometers.in/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-7 w-7 text-cyan-600" />,
      title: "Precision & Accuracy",
      description: "Diagnostics determine clinical outcomes. We ensure our equipment is calibrated to the highest global standards of diagnostic precision."
    },
    {
      icon: <ShieldCheck className="h-7 w-7 text-cyan-600" />,
      title: "Reliability & Uptime",
      description: "Hospitals and clinical pathology labs run non-stop. We design and deliver maintenance programs that guarantee minimum device downtime."
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-cyan-600" />,
      title: "Scientific Innovation",
      description: "We bridge the gap between global innovations and local pathology needs, supplying advanced, cost-effective analyzers across India."
    },
    {
      icon: <Users className="h-7 w-7 text-cyan-600" />,
      title: "Client-Centric Support",
      description: "From site planning and installation to intensive operator training and technical support, we stand with our healthcare partners."
    }
  ];

  const milestones = [
    {
      year: "2014",
      title: "The Inception",
      description: "Raj Biosis was established with a focus on distribution of high-grade laboratory reagents and diagnostic consumables."
    },
    {
      year: "2017",
      title: "Analyzer Solutions Expansion",
      description: "Transitioned to full-scale clinical solutions, importing and distributing advanced Hematology and Biochemistry Analyzers."
    },
    {
      year: "2020",
      title: "500+ Installations",
      description: "Milestone achievement of successfully establishing over 500 analyzer installations across clinical pathology labs and hospitals."
    },
    {
      year: "2023",
      title: "Global Brands Partnership",
      description: "Strengthened our channel portfolio with authorized access to leading diagnostic brands like Erba, Roche, Abbott, and Mindray."
    },
    {
      year: "Present",
      title: "National Diagnostic Supplier",
      description: "Equipping over 1,200+ healthcare facilities across India, operating with specialized calibration and maintenance teams."
    }
  ];

  const complianceFeatures = [
    "NABL Standard Guideline Conformity for all calibrations",
    "ISO & CE certified biomedical laboratory instruments",
    "Procurement of 100% genuine reagents and accessories",
    "Expert team of company-trained biomedical support engineers",
    "Prompt on-site troubleshooting and comprehensive maintenance schedules"
  ];

  return (
    <div className="site0-static">
      {/* Banner */}
      <PageBanner
        title="About Our Medical Equipment Division"
        subtitle="Empowering clinical pathology and healthcare diagnostics through premium biomedical equipment, precise calibration, and expert maintenance support."
      />

      {/* Who We Are & Story Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">
          {/* Left Image & Stats overlay */}
          <div className="relative">
            <div className="rounded-[40px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)]">
              <div className="flex h-[550px] items-center justify-center rounded-[30px] bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF]">
                <Image
                  src={DDS}
                  alt="Raj Biosis Diagnostic Laboratory Equipment Setup"
                  width={1200}
                  height={900}
                  className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Floating Experince Card */}
            <div className="absolute -bottom-6 -left-6 rounded-[26px] border border-cyan-100 bg-white/90 p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(8,145,178,0.18)]">
              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-4xl font-extrabold text-transparent">
                10+
              </h3>
              <p className="mt-1 text-sm font-semibold text-cyan-950">
                Years of Excellence
              </p>
              <p className="text-xs text-cyan-900/60">
                In Diagnostics & Biomedicals
              </p>
            </div>

            {/* Floating Support Card */}
            <div className="absolute -top-6 -right-6 hidden rounded-[26px] border border-cyan-100 bg-white/90 p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(8,145,178,0.18)] sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50">
                  <Activity className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cyan-950">99.8% Uptime</p>
                  <p className="text-xs text-cyan-900/60">Assured Lab Operations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionTitle
              badge="Our Identity"
              title="Pioneering Medical Diagnostics and Lab Technologies"
              description="For over a decade, Raj Biosis has been a pillar of trust for laboratory setups, hospitals, and clinical diagnostic labs. We source and supply advanced biomedical instruments designed for precision diagnostic testing."
            />

            <p className="mt-8 leading-8 text-cyan-900/70">
              In modern healthcare, diagnostic accuracy determines patient recovery paths. Understanding this high stakes responsibility, we cooperate only with the industry's most reliable manufacturers, providing our clients with equipment that delivers accurate results, test after test.
            </p>

            <p className="mt-5 leading-8 text-cyan-900/70">
              Whether you are establishing a new laboratory facility or looking to modernize your clinical testing instruments, our biomedical consultants provide personalized options tailored to your patient load and testing requirements.
            </p>

            {/* Minor features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-950">Hospital Setup Consultations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-950">Original Reagent Supply Channels</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-950">Authorized Brand Warranties</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-950">On-Call Engineer Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-r from-cyan-900 via-[#0A303A] to-cyan-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent_60%)]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-cyan-400">10+</p>
              <p className="mt-2 text-sm lg:text-base text-cyan-100/70 uppercase tracking-wider font-semibold">Years of Excellence</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-cyan-400">1,200+</p>
              <p className="mt-2 text-sm lg:text-base text-cyan-100/70 uppercase tracking-wider font-semibold">Labs Equipped</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-cyan-400">50+</p>
              <p className="mt-2 text-sm lg:text-base text-cyan-100/70 uppercase tracking-wider font-semibold">Cities Serviced</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-cyan-400">99.8%</p>
              <p className="mt-2 text-sm lg:text-base text-cyan-100/70 uppercase tracking-wider font-semibold">System Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-50/50 blur-3xl -z-10" />
        
        <div className="container-custom">
          <SectionTitle
            badge="Our Pillars"
            title="The Values That Guide Our Biomedical Operations"
            description="Our approach to supplying medical diagnostic systems is built on principles of precision, client trust, and scientific innovation."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((val, index) => (
              <div 
                key={index}
                className="group rounded-3xl border border-cyan-100/70 bg-gradient-to-b from-[#F8FCFD] to-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 transition-colors group-hover:bg-cyan-100">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-950 transition-colors group-hover:text-cyan-600">
                  {val.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-cyan-900/60">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Growth Journey Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-[#F8FCFD] to-[#ECFEFF]">
        <div className="container-custom">
          <SectionTitle
            badge="Our Progress"
            title="Milestones of Our Diagnostic Journey"
            description="How Raj Biosis evolved from a local reagent supplier into a leading medical laboratory solutions company."
            center
          />

          <div className="relative mt-20 before:absolute before:left-4 before:top-2 before:h-[95%] before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:to-sky-200 md:before:left-1/2 md:before:-translate-x-1/2">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative mb-16 flex flex-col md:flex-row ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-2 z-10 flex h-6.5 w-6.5 -translate-x-3 items-center justify-center rounded-full border-4 border-cyan-50 bg-cyan-500 shadow-md md:left-1/2 md:-translate-x-1/2" />

                  {/* Content Box */}
                  <div className={`ml-10 md:ml-0 w-full md:w-[45%] rounded-3xl border border-cyan-100/60 bg-white/80 p-8 backdrop-blur-xl shadow-sm transition-all hover:shadow-md ${isEven ? "md:text-left" : "md:text-left"}`}>
                    <span className="inline-block rounded-full bg-cyan-100 px-4 py-1 text-xs font-extrabold text-cyan-700">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-cyan-950">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-cyan-900/60">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Quality Assurance Section */}
      <section className="relative overflow-hidden py-24 bg-white border-t border-cyan-50">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              badge="Quality & Compliance"
              title="Adherence to Rigorous Medical Testing Standards"
              description="Diagnostic devices dictate medical prescriptions and diagnoses. We ensure that our equipment and maintenance protocols comply with NABL guidelines and clinical standards."
            />
            <p className="mt-6 leading-7 text-cyan-900/60">
              Quality assurance isn't just a compliance milestone for us—it is our primary operating philosophy. Our calibration engineers use reference standards traceble to national bodies to verify the mechanical, electrical, and optical accuracy of diagnostic systems.
            </p>
          </div>

          <div className="rounded-[36px] border border-cyan-100 bg-[#F8FCFD] p-8 md:p-12 shadow-sm">
            <h3 className="text-xl font-bold text-cyan-950 mb-6">Our Assurance Standards</h3>
            <ul className="space-y-4">
              {complianceFeatures.map((feat, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-sm font-medium text-cyan-900/80 leading-6">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}