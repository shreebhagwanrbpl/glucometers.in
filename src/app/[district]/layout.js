export async function generateMetadata({ params }) {

  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://glucometers.in/${district}`;

  return {
    title: `Biomedical Equipment & Diagnostic Products in ${districtName} | Raj Biosis`,

    description: `Raj Biosis helps buyers in ${districtName} explore biomedical equipment, diagnostic products, laboratory supplies, monitoring devices, and recurring consumables.`,

    keywords: [
      `Biomedical Products ${districtName}`,
      `Diagnostic Equipment ${districtName}`,
      `Laboratory Supplies ${districtName}`,
      `Medical Consumables ${districtName}`,
      `Monitoring Devices ${districtName}`,
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Biomedical Equipment & Diagnostic Products in ${districtName} | Raj Biosis`,
      description: `Raj Biosis helps buyers in ${districtName} explore biomedical equipment, diagnostic products, laboratory supplies, monitoring devices, and recurring consumables.`,
      url,
      type: "website",
    },
  };
}

export default function DistrictLayout({ children }) {
  return children;
}