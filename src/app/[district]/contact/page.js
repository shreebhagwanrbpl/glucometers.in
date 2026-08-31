import ContactPage from "@/app/contact/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Contact Raj Biosis ${districtName} | Get Diagnostic Equipment Quote`,
    description: `Get a quote for diagnostic equipment, hematology analyzers, and lab reagents in ${districtName}. Contact our local Raj Biosis team today.`,
    alternates: {
      canonical: `https://glucometers.in/${district}/contact`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <div className="site0-static"><ContactPage city={city} /></div>;
}