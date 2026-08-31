export async function generateMetadata({ params }) {

  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://glucometers.in/${district}`;

  return {
    title: `Blood Glucose Monitor & Glucometer Supplier in ${districtName} | Raj Biosis`,

    description: `Raj Biosis helps customers in ${districtName} source blood glucose monitors, digital glucometer devices, and diabetes testing consumables.`,

    keywords: [
      `Glucometers ${districtName}`,
      `Blood Glucose Monitors ${districtName}`,
      `Digital Glucometer Supplier ${districtName}`,
      `Diabetes Care Kits ${districtName}`,
      `Glucose Meter Sourcing ${districtName}`,
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Blood Glucose Monitor & Glucometer Supplier in ${districtName} | Raj Biosis`,
      description: `Raj Biosis helps customers in ${districtName} source blood glucose monitors, digital glucometer devices, and diabetes testing consumables.`,
      url,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}