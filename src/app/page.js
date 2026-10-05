import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";

import { fetchFullCatalog, fetchHomeData } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Biomedical Equipment & Diagnostic Products Supplier in India | Raj Biosis",
  description: "Raj Biosis offers a multi-category biomedical catalogue covering diagnostic equipment, laboratory instruments, reagents, consumables, monitoring products, test kits, and related healthcare supplies across India.",
  alternates: {
    canonical: "https://glucometers.in",
  },
};

export default async function Home({ city = "" }) {
  const [allProducts, homeData] = await Promise.all([
    fetchFullCatalog(),
    fetchHomeData().catch(() => null),
  ]);

  return (
    <div className="site0-static">
      <HeroSection city={city} initialData={homeData} />

      <TrustedBrands city={city} />

      <WhyChooseUs city={city} />

      <StatsSection city={city} />

      <ServicesPreview city={city} />

      <FeaturedProducts
        city={city}
        initialProducts={allProducts.slice(0, 6)}
      />

      <SeoContent city={city} />

      <Testimonials city={city} />

      <CTASection city={city} />
    </div>
  );
}