import ServicesClient from "./ServicesClient";
import { fetchServicesData } from "@/lib/data-fetcher-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Diagnostic & Biomedical Equipment Services | Raj Biosis",
  description: "Biomedical procurement and support for laboratory equipment, diagnostic products, monitoring devices, consumables, reagents, and institutional requirements.",
  alternates: {
    canonical: "https://glucometers.in/services",
  },
};

export default async function ServicesPage({ city = "" }) {
  const servicesData = await fetchServicesData().catch(() => null);

  return (
    <div className="site0-static">
      <ServicesClient initialData={servicesData} city={city} />
    </div>
  );
}