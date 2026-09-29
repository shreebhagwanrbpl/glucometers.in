export default function TrustedBrands() {
  const brands = [
  "Accu-Chek",
  "OneTouch",
  "Contour",
  "Dr. Trust",
  "Omron"
];

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-[#F8FCFD] via-[#F3FCFD] to-[#ECFEFF] border-y border-cyan-100">

      {/* Background Glow */}
      <div className="absolute -top-16 -left-20 h-72 w-72 rounded-full bg-cyan-300/15 blur-[120px]" />

      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-300/15 blur-[140px]" />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md">
            Brands & Manufacturers in the Range
          </div>

          <p className="mt-5 text-lg font-medium text-cyan-900/70">
            Examples of brands represented across the wider biomedical catalogue
          </p>

        </div>

        {/* Brands */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (
            <div
              key={index}
              className="group flex h-28 items-center justify-center rounded-[24px] border border-cyan-100 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(8,145,178,0.18)]"
            >
              <span className="bg-gradient-to-r from-cyan-700 to-sky-500 bg-clip-text text-lg font-bold text-transparent transition duration-300 group-hover:scale-105">
                {brand}
              </span>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}