import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher-server";

const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export async function generateMetadata({ params }) {
    const { slug, district } = await params;
    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (char) => char.toUpperCase());

    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Raj Biosis`;
    const description = `Buy ${productName} at best price in ${districtName} from Raj Biosis. Trusted local dealer, supplier and distributor of diagnostic and hospital lab instruments.`;
    const url = `https://glucometers.in/${district}/items/${slug}`;
    const canonicalUrl = `https://glucometers.in/items/${slug}`;
    const imageUrl = product?.images?.[0] || product?.image;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
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
        metadataBase: new URL("https://glucometers.in"),
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;
    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (char) => char.toUpperCase());

    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productUrl = `https://glucometers.in/items/${slug}`;
    const currentUrl = `https://glucometers.in/${district}/items/${slug}`;
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
                "name": districtName,
                "item": `https://glucometers.in/${district}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Products",
                "item": `https://glucometers.in/${district}/items`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": productName,
                "item": currentUrl
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "description": product?.desc || product?.description || `High quality biomedical laboratory equipment: ${productName}`,
        "image": imageUrl,
        "url": productUrl,
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
                    "text": `${productName} is utilized in hospitals, clinical pathology labs and diagnostic centres for healthcare diagnostic applications in ${districtName}.`
                }
            },
            {
                "@type": "Question",
                "name": `Can you help with this product requirement in ${districtName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, buyers can enquire about the product, applicable technical requirements, compatibility, quantity, and related support for the ${districtName} region.`
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
                district={district}
            />
        </>
    );
}