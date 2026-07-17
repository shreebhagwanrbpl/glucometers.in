export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""
        } max-w-3xl`}
    >

      {/* Badge */}
      {badge && (
        <div className="mb-6 inline-flex items-center rounded-full border border-cyan-200 bg-white/70 px-5 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-xl shadow-md">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-cyan-950 lg:text-5xl">
        {title}
      </h2>

      {/* Gradient Line */}
      <div
        className={`mt-5 h-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300 ${center ? "mx-auto w-24" : "w-24"
          }`}
      />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-cyan-900/70">
        {description}
      </p>

    </div>
  );
}