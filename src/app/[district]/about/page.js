import AboutPage from "@/app/about/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `About Our Medical Equipment Division in ${districtName} | Medical Equipment Supplier`,
    description: `Learn about Raj Biosis in ${districtName}. Trusted supplier of medical laboratory diagnostics, CBC machines, and biochemistry analyzers serving ${districtName}.`,
    alternates: {
      canonical: `https://glucometers.in/${district}/about`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <div className="site0-static"><AboutPage city={city} /></div>;
}