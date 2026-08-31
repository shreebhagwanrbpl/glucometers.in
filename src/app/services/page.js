import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Diagnostic & Biomedical Equipment Services | Raj Biosis",
  description: "Professional installation, calibration, maintenance, and support services for medical laboratory instruments and diagnostic analyzers by Raj Biosis.",
  alternates: {
    canonical: "https://glucometers.in/services",
  },
};

export default function ServicesPage() {
  return <div className="site0-static"><ServicesClient /></div>;
}