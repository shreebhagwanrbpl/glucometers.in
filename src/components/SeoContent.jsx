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
                        About Glucose Support Services
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-cyan-950 leading-tight">
                        Blood Glucose Monitor & Glucometer Supplier in {location}
                    </h2>

                    <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                </div>

                {/* Content */}
                <div className="mt-10 space-y-7 text-lg leading-9 text-cyan-900/70 max-w-5xl">

                    <p>Raj Biosis distributes blood glucose monitors across multiple districts, assisting clinics and home users in obtaining reliable and consistent diagnostic tools.</p>

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
                            <h3 className="text-xl font-bold text-cyan-950">Do you supply blood glucose monitors across India?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Yes, we supply digital glucometers and blood sugar monitoring equipment across multiple cities and districts.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Which glucose monitors and diabetes care accessories do you provide?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">We supply automatic glucometers, digital blood sugar meters, lancing tools, and compatible test strip packages.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Do you provide support for setting up glucometers?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Yes, we provide setup guides, user tutorials, and device calibration instructions to ensure accurate daily readings.</p>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-white/70 p-7 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-950">Who can purchase glucometers and testing devices?</h3>

                            <p className="mt-3 text-cyan-900/70 leading-8">Home users, diagnostic labs, pharmacies, clinics, and medical departments can procure glucose monitoring systems from us.</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}