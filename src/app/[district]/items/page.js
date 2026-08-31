import ProductsPage from "@/app/items/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical & Laboratory Equipment in ${districtName} | Catalog`,
    description: `Browse biomedical products, CBC machines, biochemistry analyzers, and reagents available in ${districtName} from Raj Biosis.`,
    alternates: {
      canonical: `https://glucometers.in/${district}/items`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} district={district} />;
}