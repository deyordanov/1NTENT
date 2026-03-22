import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { FAQ } from "@/components/landing/faq";

export default function FaqPage() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main className="pt-14">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
