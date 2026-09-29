import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Diagnostic & Biomedical Equipment Services | Raj Biosis",
  description: "Biomedical procurement and support for laboratory equipment, diagnostic products, monitoring devices, consumables, reagents, and institutional requirements.",
  alternates: {
    canonical: "https://glucometers.in/services",
  },
};

export default function ServicesPage() {
  return <div className="site0-static"><ServicesClient /></div>;
}