"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
                const categorySnap = await getDocs(
                    collection(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "categoryproducts",
                        "categories"
                    )
                );

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Central Biomedicals",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        <div className="relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] overflow-hidden rounded-[24px] md:rounded-[36px] border border-cyan-100 bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(8,145,178,0.15)]">

                            {/* Background Glow */}
                            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-[90px]" />
                            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky-300/15 blur-[90px]" />

                            {/* Inner Background */}
                            <div className="absolute inset-3 rounded-[20px] bg-gradient-to-br from-[#F8FCFD] via-white to-[#ECFEFF]" />

                            {selectedMedia === "video" && product.video ? (

                                <video
                                    controls
                                    autoPlay
                                    className="relative z-10 h-full w-full object-contain p-6"
                                >
                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />
                                </video>

                            ) : (

                                <>
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 z-10 animate-pulse bg-cyan-100" />
                                    )}

                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.title}
                                        fill
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                        className={`relative z-10 object-contain p-6 transition-all duration-700 ${imageLoaded
                                            ? "scale-100 opacity-100"
                                            : "scale-95 opacity-0"
                                            } hover:scale-105`}
                                    />

                                </>

                            )}

                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">

                            {/* Image Thumbnails */}
                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`group relative h-20 w-20 overflow-hidden rounded-2xl border-2 bg-white/70 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "image" &&
                                        selectedImage === img
                                        ? "border-cyan-500 shadow-lg shadow-cyan-300/40"
                                        : "border-cyan-100 hover:border-cyan-300"
                                        }`}
                                >

                                    {/* Active Glow */}
                                    {selectedMedia === "image" &&
                                        selectedImage === img && (
                                            <div className="absolute inset-0 bg-cyan-400/10" />
                                        )}

                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                </button>

                            ))}

                            {/* Video Button */}
                            {product.video && (

                                <button
                                    onClick={() => setSelectedMedia("video")}
                                    className={`group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 bg-white/70 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "video"
                                        ? "border-cyan-500 shadow-lg shadow-cyan-300/40"
                                        : "border-cyan-100 hover:border-cyan-300"
                                        }`}
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                                        <FaPlay size={16} />
                                    </div>

                                    <span className="mt-2 text-xs font-semibold text-cyan-700">
                                        Video
                                    </span>

                                </button>

                            )}

                            {/* PDF Button */}
                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-cyan-100 bg-white/70 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
                                >

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-lg text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                                        📄
                                    </div>

                                    <span className="mt-2 text-xs font-semibold text-cyan-700">
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}

                    <div>

                        {/* Title + Share */}
                        <div className="relative flex items-start justify-between gap-4">

                            <h1 className="text-2xl font-extrabold leading-tight text-cyan-950 sm:text-3xl md:text-4xl lg:text-5xl">
                                {product.title}
                            </h1>

                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                {/* Share Button */}
                                <button
                                    onClick={handleNativeShare}
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200 bg-white/70 text-cyan-700 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-lg"
                                >
                                    <FaShareAlt
                                        size={18}
                                        className="transition-transform duration-300 group-hover:rotate-12"
                                    />
                                </button>

                                {/* Share Menu */}
                                {showShare && (

                                    <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-cyan-100 bg-white/80 p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.15)]">

                                        <button
                                            onClick={handleCopy}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-cyan-900 transition hover:bg-cyan-50"
                                        >
                                            <FaLink className="text-cyan-600" />
                                            Copy Link
                                        </button>

                                        <button
                                            onClick={handleWhatsapp}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-cyan-900 transition hover:bg-cyan-50"
                                        >
                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp
                                        </button>

                                        <button
                                            onClick={handleFacebook}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-cyan-900 transition hover:bg-cyan-50"
                                        >
                                            <FaFacebook className="text-blue-600" />
                                            Facebook
                                        </button>

                                        <button
                                            onClick={handleInstagram}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-cyan-900 transition hover:bg-cyan-50"
                                        >
                                            <FaInstagram className="text-pink-600" />
                                            Instagram
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* Product Specs */}
                        <div className="mt-8 rounded-[30px] border border-cyan-100 bg-white/70 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)] md:p-8">

                            <div className="grid gap-4 sm:grid-cols-2">

                                {[
                                    ["Brand", product.brand || "N/A"],
                                    ["Model", product.model || "N/A"],
                                    ["Instrument", product.instrument || "N/A"],
                                    ["Capacity", product.capacity || "N/A"],
                                    ["Throughput", product.throughput || "N/A"],
                                    ["Usage", product.usage || "N/A"],
                                    ["Automation", product.automation || "N/A"],
                                    ["Availability", product.availability || "N/A"],
                                ].map(([label, value], index) => (

                                    <div
                                        key={index}
                                        className="rounded-2xl border border-cyan-100 bg-white/60 p-4 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                                            {label}
                                        </p>

                                        <p className="mt-2 text-base font-semibold text-cyan-950">
                                            {value}
                                        </p>
                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="h-fit rounded-[24px] border border-cyan-100 bg-white/70 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)] lg:sticky lg:top-24 md:rounded-[32px] md:p-8">

                            {/* Heading */}
                            <h2 className="text-2xl font-extrabold text-cyan-950 md:text-3xl">
                                Request A Quote
                            </h2>

                            <p className="mb-8 mt-3 text-cyan-900/70">
                                Product:
                                <span className="ml-2 font-semibold text-cyan-700">
                                    {product.title}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-cyan-200 bg-white/80 px-5 py-4 text-cyan-950 placeholder:text-cyan-400 outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-200/40"
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-cyan-200 bg-white/80 px-5 py-4 text-cyan-950 placeholder:text-cyan-400 outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-200/40"
                                />

                                {/* Phone */}
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value.replace(/\D/g, ""),
                                        })
                                    }
                                    className="w-full rounded-2xl border border-cyan-200 bg-white/80 px-5 py-4 text-cyan-950 placeholder:text-cyan-400 outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-200/40"
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 py-4 font-semibold text-white shadow-lg shadow-cyan-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {submitting ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            Get Quote

                                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </>
                                    )}
                                </button>

                            </form>

                        </div>

                        {/* Description */}

                        <div className="rounded-[24px] border border-cyan-100 bg-white/70 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(8,145,178,0.12)] md:rounded-[32px] md:p-10">

                            {/* Description */}
                            <h3 className="text-2xl font-extrabold text-cyan-950 md:mb-6 md:text-3xl">
                                Product Description
                            </h3>

                            <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                            <p className="mt-6 text-base leading-8 text-cyan-900/70 md:text-lg md:leading-9">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Specifications */}
                            <div className="mt-12">

                                <h3 className="mb-6 text-2xl font-extrabold text-cyan-950">
                                    Technical Specifications
                                </h3>

                                <div className="overflow-hidden rounded-2xl border border-cyan-100 bg-white/60 backdrop-blur-md">

                                    <table className="w-full border-collapse">

                                        <tbody>

                                            {[
                                                ["Brand", product.brand || "N/A"],
                                                ["Model", product.model || "N/A"],
                                                ["Usage", product.usage || "N/A"],
                                                ["Automation", product.automation || "N/A"],
                                                ["Capacity", product.capacity || "N/A"],
                                                ["Throughput", product.throughput || "N/A"],
                                            ].map(([label, value], index) => (

                                                <tr
                                                    key={index}
                                                    className="border-b border-cyan-100 last:border-0 hover:bg-cyan-50 transition-colors"
                                                >

                                                    <td className="w-1/3 bg-cyan-50/60 px-5 py-4 font-semibold text-cyan-700">
                                                        {label}
                                                    </td>

                                                    <td className="px-5 py-4 font-medium text-cyan-950">
                                                        {value}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            {/* SEO Content */}
                            <div className="mt-14">

                                <h3 className="text-2xl font-extrabold text-cyan-950">
                                    Why Choose Central Biomedicals in{" "}
                                    <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                        {cityName}
                                    </span>
                                    ?
                                </h3>

                                <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                <p className="mt-6 leading-8 text-cyan-900/70">
                                    Central Biomedicals is a trusted supplier and
                                    distributor of <strong>{product.title}</strong> in{" "}
                                    <strong>{cityName}</strong>. We provide high-quality
                                    biomedical and laboratory equipment for hospitals,
                                    pathology laboratories, diagnostic centres and
                                    healthcare facilities.
                                </p>

                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        Features of{" "}
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>
                                    </h3>

                                    <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        {product.title} offers reliable performance,
                                        accurate results, easy operation, long service
                                        life and efficient workflow for laboratories
                                        and hospitals.
                                    </p>

                                </div>

                                {/* Applications */}
                                <div className="mt-10">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        Applications of{" "}
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        Widely used in hospitals, pathology laboratories,
                                        diagnostic centres, blood banks, research institutes
                                        and healthcare facilities for reliable and accurate
                                        testing.
                                    </p>

                                </div>

                                {/* Supplier */}
                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>{" "}
                                        Supplier in{" "}
                                        <span className="text-cyan-700">{cityName}</span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        Central Biomedicals supplies {product.title} in{" "}
                                        {cityName} with technical support, installation
                                        assistance and dedicated customer service for
                                        hospitals and laboratories.
                                    </p>

                                </div>

                                {/* Dealer */}
                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>{" "}
                                        Dealer in{" "}
                                        <span className="text-cyan-700">{cityName}</span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        Central Biomedicals is a trusted dealer of
                                        {product.title} in {cityName}. We supply
                                        biomedical equipment, laboratory instruments,
                                        diagnostic analyzers and healthcare devices
                                        for hospitals, pathology labs and research centres.
                                    </p>

                                </div>

                                {/* Distributor */}
                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>{" "}
                                        Distributor in{" "}
                                        <span className="text-cyan-700">{cityName}</span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        Looking for a reliable distributor of
                                        {product.title} in {cityName}? We provide
                                        installation support, product guidance,
                                        maintenance assistance and fast delivery.
                                    </p>

                                </div>

                                {/* Buy */}
                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        Buy{" "}
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>{" "}
                                        in{" "}
                                        <span className="text-cyan-700">{cityName}</span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        Buy high-quality {product.title} in {cityName}
                                        at competitive prices. Contact Central Biomedicals
                                        for the latest quotation, product availability
                                        and delivery information.
                                    </p>

                                </div>

                                {/* Price */}
                                <div className="mt-12">

                                    <h3 className="text-2xl font-extrabold text-cyan-950">
                                        <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">
                                            {product.title}
                                        </span>{" "}
                                        Price in{" "}
                                        <span className="text-cyan-700">{cityName}</span>
                                    </h3>

                                    <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                    <p className="mt-6 leading-8 text-cyan-900/70">
                                        The price of {product.title} depends on
                                        the brand, model, specifications and
                                        available features. Contact our team for
                                        the latest pricing, availability and
                                        delivery details.
                                    </p>

                                </div>
                            </div>

                            {/* FAQ Section */}

                            <div className="mt-16">

                                {/* Heading */}
                                <h3 className="text-3xl font-extrabold text-cyan-950">
                                    Frequently Asked Questions
                                </h3>

                                <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-300" />

                                <div className="mt-10 space-y-6">

                                    {[
                                        {
                                            question: `What is ${product.title} used for in ${cityName}?`,
                                            answer: `${product.title} is commonly used in hospitals, pathology laboratories and diagnostic centres.`,
                                        },
                                        {
                                            question: `What is the price of ${product.title} in ${cityName}?`,
                                            answer: "Pricing depends on specifications, brand and model. Contact us for the latest quotation.",
                                        },
                                        {
                                            question: `Are you an authorized supplier of ${product.title}?`,
                                            answer: "We supply genuine biomedical and laboratory equipment from trusted manufacturers and brands.",
                                        },
                                        {
                                            question: `Can hospitals in ${cityName} order this product?`,
                                            answer: "Yes, hospitals, pathology laboratories, diagnostic centres and healthcare facilities can order this product.",
                                        },
                                        {
                                            question: "Do you provide installation support?",
                                            answer: "Yes, installation assistance and technical support are available depending on the product.",
                                        },
                                        {
                                            question: "Can I request a quotation?",
                                            answer: "Yes, simply submit the enquiry form on this page to receive pricing and product information.",
                                        },
                                        {
                                            question: "Do you provide warranty?",
                                            answer: "Warranty depends on the manufacturer and product model.",
                                        },
                                        {
                                            question: "Do you deliver across India?",
                                            answer: "Yes, we supply biomedical products across India with secure packaging and reliable logistics.",
                                        },
                                        {
                                            question: "How can I contact Central Biomedicals?",
                                            answer: "You can fill out the enquiry form or contact our team directly for product details and quotations.",
                                        },
                                    ].map((faq, index) => (

                                        <div
                                            key={index}
                                            className="group rounded-[28px] border border-cyan-100 bg-white/70 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,145,178,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(8,145,178,0.15)]"
                                        >

                                            <div className="flex items-start gap-4">

                                                {/* Q Icon */}
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-lg font-bold text-white shadow-lg shadow-cyan-300/40">
                                                    ?
                                                </div>

                                                <div>

                                                    <h4 className="text-xl font-bold text-cyan-950 transition-colors duration-300 group-hover:text-cyan-600">
                                                        {faq.question}
                                                    </h4>

                                                    <p className="mt-3 leading-8 text-cyan-900/70">
                                                        {faq.answer}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div >
        </section >
    );
}