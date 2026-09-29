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
                        Biomedical Catalogue Overview
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-cyan-950 leading-tight">
                        Biomedical Equipment, Diagnostic Products & Laboratory Supplies in {location}
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                </div>

                {/* Content */}
                <div className="mt-10 space-y-7 text-lg leading-9 text-cyan-900/70 max-w-5xl">

                    <p>Raj Biosis presents a multi-category biomedical catalogue for buyers who need more than a single type of device. The range includes laboratory analyzers, diagnostic kits, patient-monitoring equipment, sample-collection products, reagents, test strips, and routine laboratory consumables.</p>

                    <p>Whether the requirement is a single instrument, recurring consumables, compatible accessories, or a larger institutional order, the catalogue is designed to help buyers identify relevant products by category, specification, brand, and intended application{location !== "India" ? ` in ${location}` : " across India"}.</p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md mb-6">
                        Buyer FAQs
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold text-cyan-950">
                        Questions Buyers Commonly Ask
                    </h2>

                    <div className="mt-10 grid gap-6">

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Can I source different biomedical product categories from the same catalogue?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Yes. The catalogue covers diagnostic equipment, laboratory instruments, consumables, reagents, monitoring devices, test kits, and other biomedical products rather than being limited to glucose-monitoring items.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">What kinds of products are included?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Product groups include analyzers, diagnostic kits, blood-collection supplies, pipette and laboratory accessories, monitoring devices, reagents, strips, and many other healthcare and laboratory essentials.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Can buyers ask for help selecting equipment?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Yes. Buyers can use the available specifications and enquiry channels to discuss model selection, compatibility, intended application, and procurement requirements.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Who is the catalogue intended for?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Hospitals, pathology laboratories, clinics, pharmacies, diagnostic centres, distributors, institutional departments, and other biomedical buyers can use the catalogue for their requirements.</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}