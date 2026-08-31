import Home from "@/app/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Blood Glucose Monitor & Glucometer Dealer in ${districtName} | Raj Biosis`,
    description: `Looking for reliable glucose monitoring systems in ${districtName}? Raj Biosis is a leading supplier of blood glucose monitors, digital glucometers, and diabetes care kits.`,
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