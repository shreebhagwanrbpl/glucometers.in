"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [productCategories, setProductCategories] = useState([]);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  /* =====================================================
     LOAD CONTACT INFORMATION
  ===================================================== */

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucometersin",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.error(
          "Error loading contact information:",
          err
        );

        setLoading(false);
      }
    };

    loadContact();
  }, []);

  /* =====================================================
     LOAD DISTRICT DATA
  ===================================================== */

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) {
        setDistrictData(null);
        return;
      }

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "glucometersin",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.error(
          "Error loading district:",
          err
        );
      }
    };

    loadDistrict();
  }, [district]);

  /* =====================================================
     LOAD PRODUCT CATEGORIES
  ===================================================== */

  useEffect(() => {
    const loadProductCategories = async () => {
      try {
        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "glucometersin",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const categories = [];

        categorySnap.forEach((categoryDoc) => {
          const data = categoryDoc.data();

          const categoryName =
            data.category ||
            data.name ||
            data.title ||
            categoryDoc.id;

          if (!categoryName) return;

          const cleanName = String(
            categoryName
          ).trim();

          if (!cleanName) return;

          categories.push({
            id: categoryDoc.id,
            name: cleanName,
          });
        });

        /* Remove duplicate category names */

        const uniqueCategories = [];
        const seen = new Set();

        categories.forEach((category) => {
          const key = category.name
            .toLowerCase()
            .trim();

          if (!seen.has(key)) {
            seen.add(key);
            uniqueCategories.push(category);
          }
        });

        /* Show only first 5 categories */

        setProductCategories(
          uniqueCategories.slice(0, 5)
        );
      } catch (err) {
        console.error(
          "Error loading product categories:",
          err
        );

        setProductCategories([]);
      }
    };

    loadProductCategories();
  }, []);

  /* =====================================================
     CONTACT VALUES
  ===================================================== */

  const phone =
    contactInfo.find(
      (x) =>
        x.label?.trim().toLowerCase() === "phone"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) =>
        x.label?.trim().toLowerCase() === "email"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) =>
        x.label?.trim().toLowerCase() === "address"
    )?.value || "";

  /* =====================================================
     DISTRICT ADDRESS
  ===================================================== */

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  /* =====================================================
     DISTRICT ROUTING
  ===================================================== */

  const makeLink = (path) => {
    if (!district) {
      return path;
    }

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  /* =====================================================
     CATEGORY SLUG
  ===================================================== */

  const makeCategorySlug = (name = "") => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  /* =====================================================
     PHONE FORMAT
  ===================================================== */

  const phoneNumbers = Array.isArray(phone)
    ? phone.filter(
      (number) =>
        number !== null &&
        number !== undefined &&
        String(number).trim() !== ""
    )
    : phone
      ? [phone]
      : [];

  /* =====================================================
     LOADING STATE
  ===================================================== */

  if (loading) {
    return (
      <footer className="relative overflow-hidden bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/80">

        <div className="container-custom relative py-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

            {[...Array(5)].map((_, i) => (
              <div key={i}>

                <div className="mb-6 h-8 w-40 animate-pulse rounded bg-slate-200" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="mb-4 h-5 animate-pulse rounded bg-slate-200"
                  />
                ))}

              </div>
            ))}

          </div>

          <div className="mt-12 border-t border-slate-200 pt-6">

            <div className="h-5 w-72 animate-pulse rounded bg-slate-200" />

          </div>

        </div>

      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-cyan-50/80 via-white to-sky-50/80">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-300/15 blur-[140px]" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="container-custom relative py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <h2 className="text-3xl font-extrabold">

              <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                Raj
              </span>

              <span className="text-cyan-950">
                {" "}Biosis
              </span>

            </h2>

            <p className="mt-5 leading-8 text-cyan-900/70">
              Delivering trusted diagnostic and biomedical
              solutions with innovation, quality, and
              precision healthcare support.
            </p>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}

            <div className="mt-6 flex items-center gap-3">

              {/* Instagram */}

              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Raj Biosis Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-100 bg-white text-[#E4405F] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:bg-pink-50 hover:shadow-lg"
              >
                <FaInstagram size={21} />
              </a>

              {/* Facebook */}

              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Raj Biosis Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-white text-[#1877F2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
              >
                <FaFacebookF size={20} />
              </a>

            </div>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-cyan-950">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                href={makeLink("/")}
                className="text-cyan-900/70 transition hover:text-cyan-600"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="text-cyan-900/70 transition hover:text-cyan-600"
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="text-cyan-900/70 transition hover:text-cyan-600"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="text-cyan-900/70 transition hover:text-cyan-600"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="text-cyan-900/70 transition hover:text-cyan-600"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* =================================================
              PRODUCT CATEGORIES
          ================================================= */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-cyan-950">
              Product Categories
            </h3>

            <div className="flex flex-col gap-3">

              {productCategories.length > 0 ? (

                productCategories.map((category) => (

                  <Link
                    key={category.id}
                    href={`${makeLink("/items")}?category=${makeCategorySlug(category.name)}`}
                    className="text-cyan-900/70 transition-all duration-300 hover:translate-x-1 hover:text-cyan-600"
                  >
                    {category.name}
                  </Link>

                ))

              ) : (

                <Link
                  href={makeLink("/items")}
                  className="text-cyan-900/70 transition hover:text-cyan-600"
                >
                  View All Products
                </Link>

              )}

            </div>

          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-cyan-950">
              Services
            </h3>

            <div className="space-y-3 text-cyan-900/70">

              <p>Glucometer Supply</p>

              <p>Diabetes Tracking Kits</p>

              <p>Digital Sugar Meters</p>

              <p>Calibration Sourcing</p>

            </div>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-cyan-950">
              Contact Info
            </h3>

            <div className="space-y-5">

              {/* Address */}

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md">
                  <MapPin size={18} />
                </div>

                <p className="text-cyan-900/70">
                  {dynamicAddress}
                </p>

              </div>

              {/* Phone */}

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md">
                  <Phone size={18} />
                </div>

                <div className="flex flex-col gap-1.5 text-cyan-900/70">

                  {phoneNumbers.length > 0 ? (

                    phoneNumbers.map((number, index) => {

                      const phoneText = String(number);

                      return (
                        <a
                          key={`${phoneText}-${index}`}
                          href={`tel:${phoneText.replace(/\s+/g, "")}`}
                          className="transition hover:text-cyan-600"
                        >
                          {phoneText}
                        </a>
                      );

                    })

                  ) : (

                    <span>
                      Contact us
                    </span>

                  )}

                </div>

              </div>

              {/* Email */}

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md">
                  <Mail size={18} />
                </div>

                <p className="break-all text-cyan-900/70">
                  {email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div className="mt-14 flex flex-col items-center justify-between border-t border-cyan-200 pt-6 text-sm text-cyan-900/60 md:flex-row">

          <p>
            © 2026{" "}
            <span className="font-semibold text-cyan-700">
              Raj Biosis
            </span>
            . All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for modern diabetes care and glucose monitoring.
          </p>

        </div>

      </div>

    </footer>
  );
}