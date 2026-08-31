"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-100/70 bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgba(8,145,178,0.08)]">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href={makeLink("/")}
          className="inline-flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Raj Biosis"
            width={150}
            height={55}
            priority
            className="h-[55px] w-[150px] object-contain object-left"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 text-[15px] font-semibold lg:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative text-cyan-900/70 transition-all duration-300 hover:text-cyan-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-sky-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button className="rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-7 py-3 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50">
              Get Quote
            </button>

          </Link>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-cyan-100 bg-white/70 p-2 text-cyan-700 backdrop-blur transition hover:bg-cyan-50 lg:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >

        <div className="border-t border-cyan-100 bg-white/80 p-6 backdrop-blur-2xl">

          <nav className="flex flex-col gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="font-semibold text-cyan-900/70 transition hover:text-cyan-600"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button className="mt-3 w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 py-3 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:shadow-cyan-400/50">
                Get Quote
              </button>

            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}