import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Central Biomedicals"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <div className="rounded-[40px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)]">

              <div className="flex h-[600px] items-center justify-center rounded-[30px] bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF]">

                <Image
                  src={DDS}
                  alt="About"
                  width={1200}
                  height={900}
                  className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
                />

              </div>

            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 hidden rounded-[26px] border border-cyan-100 bg-white/70 p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(8,145,178,0.18)] lg:block">

              <h3 className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-4xl font-extrabold text-transparent">
                10+
              </h3>

              <p className="mt-2 text-cyan-900/70">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 leading-8 text-cyan-900/70">
              At Central Biomedicals, we are committed to delivering
              premium-quality healthcare and biomedical technologies
              designed to improve diagnostics, laboratory performance,
              and medical efficiency.
            </p>

            <p className="mt-5 leading-8 text-cyan-900/70">
              Our mission is to empower healthcare professionals with
              trusted equipment, expert consultation, and innovative
              biomedical support.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              <div className="group rounded-2xl border border-cyan-100 bg-white/70 p-6 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl">

                <h4 className="text-lg font-bold text-cyan-950 group-hover:text-cyan-600 transition-colors">
                  Premium Equipment
                </h4>

                <p className="mt-2 leading-7 text-cyan-900/70">
                  High-end diagnostic technologies.
                </p>

              </div>

              <div className="group rounded-2xl border border-cyan-100 bg-white/70 p-6 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl">

                <h4 className="text-lg font-bold text-cyan-950 group-hover:text-cyan-600 transition-colors">
                  Expert Support
                </h4>

                <p className="mt-2 leading-7 text-cyan-900/70">
                  Trusted healthcare consultation.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}