"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowRight,
  CheckCircle2,
  Microscope,
  FlaskConical,
  Activity,
  Headphones,
  MessageSquare,
  Building2,
} from "lucide-react";

import CTASection from "@/components/CTASection";

export default function ContactClient() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const pathname = usePathname();

  /* =====================================================
     DISTRICT
  ===================================================== */

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "items",
    "contact",
  ];

  const currentDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : null;

  /* =====================================================
     FORM
  ===================================================== */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Enter valid email");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Enter valid mobile number");
    }

    if (!form.message.trim()) {
      return toast.error("Message is required");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "glucometersin",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     LOAD DISTRICT
  ===================================================== */

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) {
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
            currentDistrict
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);

  /* =====================================================
     LOAD CONTACT
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  /* =====================================================
     CONTACT VALUES
  ===================================================== */

  const phoneValue =
    contactInfo.find(
      (x) => x.label === "Phone"
    )?.value || "";

  const phones = Array.isArray(phoneValue)
    ? phoneValue
    : phoneValue
      ? [phoneValue]
      : [];

  const email =
    contactInfo.find(
      (x) => x.label === "Email"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Address"
    )?.value || "";

  const hours =
    contactInfo.find(
      (x) => x.label === "Working Hours"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">

            <div className="h-[480px] animate-pulse rounded-[40px] bg-slate-100" />

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-[28px] bg-slate-100"
                  />
                ))}
              </div>

              <div className="h-[650px] animate-pulse rounded-[40px] bg-slate-100" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      {/* =====================================================
          CONTACT HERO / BANNER
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-indigo-50">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px]" />

        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-indigo-300/15 blur-[110px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-200/20 blur-[90px]" />

        {/* Decorative circles */}
        <div className="absolute left-[8%] top-[25%] h-20 w-20 rounded-full border border-cyan-200/60" />

        <div className="absolute right-[9%] top-[22%] h-32 w-32 rounded-full border border-indigo-200/50" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 md:pb-20 md:pt-24 lg:pt-28">

          {/* Main heading */}
          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-cyan-700 shadow-lg shadow-cyan-100/60 backdrop-blur">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              Premium Biomedical Solutions

            </span>

            <h1 className="mt-7 text-5xl font-extrabold tracking-tight text-cyan-950 sm:text-6xl lg:text-7xl">

              Contact{" "}

              <span className="bg-gradient-to-r from-cyan-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                {districtData?.district ? `Raj Biosis ${districtData.district}` : "Us"}
              </span>

            </h1>

            <div className="mx-auto mt-7 h-1.5 w-36 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400" />

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-cyan-900/70 md:text-xl">

              Connect with our glucose monitoring team {districtData?.district ? `in ${districtData.district}` : ""} for diagnostic equipment,
              laboratory solutions, biomedical instruments and
              healthcare support.

            </p>

          </div>

          {/* Hero highlights */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">

            {/* Product Enquiry */}
            <div className="group rounded-[28px] border border-cyan-100 bg-white/90 p-6 text-center shadow-[0_18px_45px_rgba(8,145,178,0.10)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(8,145,178,0.16)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/30 transition-transform duration-300 group-hover:scale-110">

                <MessageSquare size={24} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-cyan-950">
                Product Enquiry
              </h3>

              <p className="mt-2 text-sm leading-6 text-cyan-900/60">
                Ask about products, availability and specifications.
              </p>

            </div>

            {/* Equipment Consultation */}
            <div className="group rounded-[28px] border border-indigo-100 bg-white/90 p-6 text-center shadow-[0_18px_45px_rgba(99,102,241,0.10)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(99,102,241,0.16)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-300/30 transition-transform duration-300 group-hover:scale-110">

                <Microscope size={24} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-cyan-950">
                Equipment Consultation
              </h3>

              <p className="mt-2 text-sm leading-6 text-cyan-900/60">
                Discuss your diagnostic and laboratory requirements.
              </p>

            </div>

            {/* Professional Support */}
            <div className="group rounded-[28px] border border-emerald-100 bg-white/90 p-6 text-center shadow-[0_18px_45px_rgba(16,185,129,0.10)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(16,185,129,0.16)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-300/30 transition-transform duration-300 group-hover:scale-110">

                <Headphones size={24} />

              </div>

              <h3 className="mt-5 text-lg font-bold text-cyan-950">
                Professional Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-cyan-900/60">
                Connect with our team for your healthcare needs.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION + FORM
      ===================================================== */}

      <section className="bg-white px-4 py-20 md:py-24">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">

          {/* LEFT */}
          <div>

            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700">
              Talk To Our Team
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-cyan-950 md:text-5xl">

              Let's Start a

              <span className="block bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                Conversation
              </span>

            </h2>

            <div className="mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500" />

            <p className="mt-6 max-w-xl text-lg leading-8 text-cyan-900/70">

              Reach out to us for healthcare consultation,
              biomedical products, diagnostic equipment and
              laboratory support.

            </p>

            {/* Contact details ONLY HERE */}
            <div className="mt-10 space-y-5">

              {/* PHONE NUMBERS */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-cyan-100 bg-white p-6 shadow-[0_10px_35px_rgba(8,145,178,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/30 transition-transform duration-300 group-hover:scale-105">
                  <Phone size={23} />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-semibold text-cyan-600">
                    Mobile Number
                  </p>

                  <div className="mt-2 space-y-2">

                    {phones.length > 0 ? (
                      phones.map((number, index) => (
                        <a
                          key={`${number}-${index}`}
                          href={`tel:${String(number).replace(/\s+/g, "")}`}
                          className="block break-words font-bold text-cyan-950 transition-colors hover:text-cyan-600"
                        >
                          {number}
                        </a>
                      ))
                    ) : (
                      <p className="font-bold text-cyan-950">
                        Contact us
                      </p>
                    )}

                  </div>

                </div>

              </div>
              {/* EMAIL */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-indigo-100 bg-white p-6 shadow-[0_10px_35px_rgba(99,102,241,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-300/30 group-hover:scale-105">

                  <Mail size={23} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-indigo-600">
                    Business Email
                  </p>

                  <p className="mt-2 break-all font-bold text-cyan-950">
                    {email || "Email us"}
                  </p>

                </div>

              </div>

              {/* ADDRESS */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-sky-100 bg-white p-6 shadow-[0_10px_35px_rgba(14,165,233,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-300/30 group-hover:scale-105">

                  <MapPin size={23} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-sky-600">
                    Office Address
                  </p>

                  <p className="mt-2 leading-7 text-cyan-900/70">
                    {dynamicAddress || "Visit our office"}
                  </p>

                </div>

              </div>

              {/* HOURS */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_10px_35px_rgba(16,185,129,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-300/30 group-hover:scale-105">

                  <Clock3 size={23} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-emerald-600">
                    Working Hours
                  </p>

                  <p className="mt-2 leading-7 text-cyan-900/70">
                    {hours || "Please contact us"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="relative overflow-hidden rounded-[40px] border border-cyan-100 bg-white p-8 shadow-[0_25px_70px_rgba(8,145,178,0.12)] md:p-10">

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-indigo-200/20 blur-3xl" />

            <div className="relative">

              <div className="mb-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-300/30">

                  <MessageSquare size={23} />

                </div>

                <h3 className="mt-6 text-3xl font-extrabold text-cyan-950">
                  Send Us a Message
                </h3>

                <p className="mt-3 leading-7 text-cyan-900/65">
                  Tell us what you need and our team can help
                  you find the right solution.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-cyan-950 outline-none placeholder:text-cyan-400 transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200/40"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Business Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-cyan-950 outline-none placeholder:text-cyan-400 transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200/40"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="w-full rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-cyan-950 outline-none placeholder:text-cyan-400 transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200/40"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Requirement Topic"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-cyan-950 outline-none placeholder:text-cyan-400 transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200/40"
                />

                <textarea
                  rows={6}
                  name="message"
                  placeholder="Tell us what you need"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-cyan-200 bg-white px-5 py-4 text-cyan-950 outline-none placeholder:text-cyan-400 transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200/40"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 py-4 font-semibold text-white shadow-lg shadow-cyan-300/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {submitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Send Message

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY RAJ BIOSIS
      ===================================================== */}

      <section className="bg-gradient-to-b from-white via-cyan-50/30 to-white px-4 py-20 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-3xl text-center">

            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-white px-5 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
              Why Raj Biosis
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-cyan-950 md:text-4xl">
              Solutions Built Around Your Needs
            </h2>

            <p className="mt-4 leading-7 text-cyan-900/65">
              Explore professional diagnostic, laboratory and
              biomedical solutions for modern healthcare requirements.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Diagnostic */}
            <div className="group rounded-[30px] border border-cyan-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:scale-110">

                <Microscope size={26} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-cyan-950">
                Diagnostic Equipment
              </h3>

              <p className="mt-3 leading-7 text-cyan-900/65">
                Diagnostic equipment for hospitals,
                laboratories and healthcare environments.
              </p>

            </div>

            {/* Laboratory */}
            <div className="group rounded-[30px] border border-sky-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 group-hover:scale-110">

                <FlaskConical size={26} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-cyan-950">
                Laboratory Solutions
              </h3>

              <p className="mt-3 leading-7 text-cyan-900/65">
                Solutions designed to support modern
                laboratory workflows and requirements.
              </p>

            </div>

            {/* Biomedical */}
            <div className="group rounded-[30px] border border-indigo-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110">

                <Activity size={26} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-cyan-950">
                Biomedical Instruments
              </h3>

              <p className="mt-3 leading-7 text-cyan-900/65">
                Professional biomedical instruments for
                healthcare and diagnostic applications.
              </p>

            </div>

            {/* Support */}
            <div className="group rounded-[30px] border border-emerald-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110">

                <Headphones size={26} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-cyan-950">
                Support & Consultation
              </h3>

              <p className="mt-3 leading-7 text-cyan-900/65">
                Assistance while exploring equipment and
                solutions for your requirements.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OFFICE / MAP
      ===================================================== */}

      <section className="bg-white px-4 py-20 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-sm font-semibold text-cyan-700">

              <MapPin size={16} />

              Find Us

            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-cyan-950 md:text-4xl">
              Visit Our Office
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-cyan-900/65">
              Find Raj Biosis and connect with our team.
            </p>

          </div>

          <div className="overflow-hidden rounded-[40px] border border-cyan-100 bg-white p-2 shadow-[0_20px_60px_rgba(8,145,178,0.12)]">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              title="Raj Biosis Office Location"
              className="w-full rounded-[32px] border-0"
            />

          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-5">

            <MapPin
              size={20}
              className="mt-0.5 shrink-0 text-cyan-600"
            />

            <p className="leading-7 text-cyan-900/70">
              {dynamicAddress}
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <CTASection />
    </>
  );
}