import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Journey } from "@/components/landing/journey";
import { Statement } from "@/components/landing/statement";
import { CalculatorTeaser } from "@/components/landing/calculator-teaser";
import { FAQ } from "@/components/landing/faq";
import { CTAFooter } from "@/components/landing/cta-footer";
import { Footer } from "@/components/landing/footer";
import { GrainOverlay } from "@/components/landing/grain-overlay";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Statement />
        <CalculatorTeaser />
        <FAQ />
        <CTAFooter />
      </main>
      <Footer />
    </>
  );
}
