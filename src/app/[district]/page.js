import Home from "@/app/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical Equipment & Diagnostic Products in ${districtName} | Raj Biosis`,
    description: `Find biomedical equipment, diagnostic products, laboratory supplies, monitoring devices, reagents, and consumables for healthcare requirements in ${districtName}.`,
    alternates: {
      canonical: `https://glucometers.in/${district}`,
    },
  };
}

export default async function DistrictPage({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <div className="site0-static"><Home city={city} /></div>;
}