import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL(
    "https://glucometers.in"
  ),

  title: {
    default: "Blood Glucose Monitor & Glucometer Supplier in India | Raj Biosis",
    template: "%s | Raj Biosis",
  },

  description: "Raj Biosis is a leading supplier of blood glucose monitoring systems, digital glucometer devices, diabetes self-testing kits, and blood sugar monitors in India.",

  keywords: [
    "Blood Glucose Monitors",
    "Glucometer Supplier",
    "Digital Glucometer Dealer",
    "Accu-Chek Dealer India",
    "OneTouch Strips supplier",
    "Diabetes Testing Kits",
    "Raj Biosis",
  ],

  openGraph: {
    title: "Blood Glucose Monitor & Glucometer Supplier in India | Raj Biosis",
    description: "Premium supplier of diagnostics and medical equipment across India.",
    url: "https://glucometers.in",
    siteName: "Raj Biosis",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blood Glucose Monitor & Glucometer Supplier in India | Raj Biosis",
    description: "Premium supplier of diagnostics and medical equipment across India.",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://glucometers.in",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Raj Biosis",
  "url": "https://glucometers.in",
  "logo": "https://glucometers.in/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 9983123469",
    "contactType": "sales",
    "email": "rajbiosis@yahoo.in",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Raj Biosis",
  "url": "https://glucometers.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://glucometers.in/items?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}