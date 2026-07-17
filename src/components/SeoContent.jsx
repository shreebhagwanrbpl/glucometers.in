export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF]">

            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-[130px]" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-300/15 blur-[150px]" />

            <div className="container-custom relative z-10">

                {/* Heading */}
                <div className="max-w-4xl">

                    <div className="inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md mb-6">
                        About Our Services
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-cyan-950 leading-tight">
                        Biomedical Equipment Supplier in{" "}
                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                            {location}
                        </span>
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                </div>

                {/* Content */}
                <div className="mt-10 space-y-7 text-lg leading-9 text-cyan-900/70 max-w-5xl">

                    <p>
                        Central Biomedicals is a trusted supplier of biomedical
                        and laboratory equipment in <strong className="text-cyan-700">{location}</strong>.
                        We provide CBC Machines, Hematology Analyzers,
                        Biochemistry Analyzers, Urine Analyzers,
                        ELISA Readers and diagnostic instruments
                        for hospitals, pathology labs and
                        healthcare facilities.
                    </p>

                    <p>
                        Our mission is to provide reliable and
                        high-quality laboratory equipment to
                        healthcare professionals across India.
                        We work with diagnostic centres,
                        hospitals, research laboratories and
                        medical institutions to deliver advanced
                        biomedical solutions.
                    </p>

                    <p>
                        We offer installation assistance,
                        product guidance and technical support
                        for a wide range of laboratory
                        instruments. Whether you are setting up
                        a new diagnostic laboratory or upgrading
                        existing equipment, our team can help
                        you select the right solution.
                    </p>

                    <p>
                        Central Biomedicals supplies equipment
                        across multiple districts and cities,
                        helping healthcare providers improve
                        testing efficiency and diagnostic
                        accuracy.
                    </p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md mb-6">
                        Frequently Asked Questions
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold text-cyan-950">
                        Common Questions
                    </h2>

                    <div className="mt-10 grid gap-6">

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">
                                Yes, we supply biomedical and laboratory equipment
                                across multiple districts and cities.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">
                                We provide CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers,
                                Urine Analyzers and other diagnostic equipment.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">
                                Do you provide installation support?
                            </h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">
                                Yes, installation assistance and technical support
                                are available depending on location and equipment type.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">
                                Hospitals, pathology labs, diagnostic centres,
                                research laboratories and healthcare facilities
                                can purchase equipment from us.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}