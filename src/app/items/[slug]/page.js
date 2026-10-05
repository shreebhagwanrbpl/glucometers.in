import ProductDetails from "./ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher-server";

const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in India | Price & Details | Raj Biosis`;

    const description = product
        ? (product.desc || product.description || `Buy ${productName} at best price in India. Trusted supplier, dealer and distributor of ${productName} for hospitals, laboratories and diagnostic centers.`)
        : `Buy ${productName} at best price in India. Trusted supplier, dealer and distributor of ${productName} for hospitals, laboratories and diagnostic centers.`;

    const url = `https://glucometers.in/items/${slug}`;
    const imageUrl = product?.images?.[0] || product?.image;

    return {
        title,
        description,

        keywords: [
            productName,
            ...(product?.brand ? [`${productName} ${product.brand}`, product.brand] : []),
            ...(product?.model ? [`${productName} ${product.model}`, product.model] : []),
            ...(product?.category ? [product.category] : []),
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Price`,
            "Biomedical Equipment",
            "Raj Biosis",
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: "Raj Biosis",
            type: "website",
            locale: "en_IN",
            images: imageUrl ? [{ url: imageUrl, alt: productName }] : undefined,
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        metadataBase: new URL("https://glucometers.in"),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const canonicalUrl = `https://glucometers.in/items/${slug}`;
    const imageUrl = product?.images?.[0] || product?.image || "https://glucometers.in/logo.png";

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://glucometers.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://glucometers.in/items"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": productName,
                "item": canonicalUrl
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "description": product?.desc || product?.description || `High quality biomedical laboratory equipment: ${productName}`,
        "image": imageUrl,
        "url": canonicalUrl,
        ...(product?.brand ? { "brand": { "@type": "Brand", "name": product.brand } } : {}),
        ...(product?.model ? { "model": product.model } : {}),
        ...(product?.category ? { "category": product.category } : {}),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is ${productName} used for?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${productName} is utilized in hospitals, clinical pathology labs and diagnostic centres for healthcare diagnostic applications.`
                }
            },
            {
                "@type": "Question",
                "name": "Do you provide installation support?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide dynamic technical support, installation guidance, and quality calibration services for clinical instruments."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ProductDetails
                slug={slug}
                initialProduct={product || null}
            />
        </>
    );
}