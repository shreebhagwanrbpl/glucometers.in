import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";

import { fetchFullCatalog } from "@/lib/data-fetcher-server";

export const revalidate = 3600;

export const metadata = {
  title: "Blood Glucose Monitor & Glucometer Dealer in India | Raj Biosis",
  description: "Raj Biosis is a premier supplier of blood glucose monitors, digital glucometers, lancing devices, and blood sugar testing kits across India.",
  alternates: {
    canonical: "https://glucometers.in",
  },
};

export default async function Home({ city = "" }) {
  const allProducts = await fetchFullCatalog();

  return (
    <div className="site0-static">
      <HeroSection city={city} />

      <TrustedBrands city={city} />

      <WhyChooseUs city={city} />

      <StatsSection city={city} />

      <ServicesPreview city={city} />

      <FeaturedProducts
        city={city}
        initialProducts={allProducts.slice(0, 3)}
      />

      <SeoContent city={city} />

      <Testimonials city={city} />

      <CTASection city={city} />
    </div>
  );
}