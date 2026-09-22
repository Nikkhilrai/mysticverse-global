import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ThankYouPopup from "@/components/thanks/ThankYouPopup";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ThankYouPopup />
    </>
  );
}
