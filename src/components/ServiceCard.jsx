import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-[30px] border border-cyan-100 bg-white/70 p-8 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(8,145,178,0.18)]">

      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-2xl font-bold text-cyan-950 transition-colors duration-300 group-hover:text-cyan-600">
        {title}
      </h3>

      {/* Description */}
      <p className="leading-8 text-cyan-900/70">
        {description}
      </p>

    </div>
  );
}