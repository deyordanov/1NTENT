import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Journey } from "@/components/landing/journey";
import { Statement } from "@/components/landing/statement";
import { TypingTestimonial } from "@/components/landing/typing-testimonial";
import { CalculatorCTA } from "@/components/landing/calculator-cta";
import { CTAFooter } from "@/components/landing/cta-footer";
import { Footer } from "@/components/landing/footer";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { CursorHearts } from "@/components/cursor-hearts";
import { MobileStickyCTA } from "@/components/landing/mobile-sticky-cta";
import { ExitIntent } from "@/components/landing/exit-intent";
import { LiveActivity } from "@/components/landing/live-activity";
import { SuccessStory } from "@/components/landing/success-story";

export default function Home() {
  return (
    <>
      <CursorHearts />
      <MobileStickyCTA />
      <ExitIntent />
      <LiveActivity />
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Statement />
        <TypingTestimonial />
        <SuccessStory />
        <CalculatorCTA />
        <CTAFooter />
      </main>
      <Footer />
    </>
  );
}
