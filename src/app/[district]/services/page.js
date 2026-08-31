import ServicesPage from "@/app/services/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical Equipment Services in ${districtName} | Raj Biosis`,
    description: `Expert installation, calibration, and maintenance services for medical laboratory instruments and diagnostic analyzers in ${districtName} by Raj Biosis.`,
    alternates: {
      canonical: `https://glucometers.in/${district}/services`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <div className="site0-static"><ServicesPage city={city} /></div>;
}