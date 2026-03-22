import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Journey } from "@/components/landing/journey";
import { Statement } from "@/components/landing/statement";
import { CalculatorCTA } from "@/components/landing/calculator-cta";
import { CTAFooter } from "@/components/landing/cta-footer";
import { Footer } from "@/components/landing/footer";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { CursorHearts } from "@/components/cursor-hearts";
import { MobileStickyCTA } from "@/components/landing/mobile-sticky-cta";
import { ExitIntent } from "@/components/landing/exit-intent";

export default function Home() {
  return (
    <>
      <CursorHearts />
      <MobileStickyCTA />
      <ExitIntent />
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Statement />
        <CalculatorCTA />
        <CTAFooter />
      </main>
      <Footer />
    </>
  );
}
