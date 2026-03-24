import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { Calculator } from "@/components/calculator";

export default function CalculatorPage() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main className="pt-14">
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-xl px-6">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Колко ти{" "}
              <span className="italic text-primary">струва</span> случайното
              запознанство?
            </h1>
            <p className="mt-3 text-muted-foreground">
              Повечето хора не осъзнават колко време и пари отиват за
              безрезултатни запознанства. Виж сам.
            </p>
            <div className="mt-10">
              <Calculator />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
