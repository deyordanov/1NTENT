"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const spring = useSpring(0, { stiffness: 120, damping: 25 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  minLabel: string;
  maxLabel: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="rounded-2xl border border-border/40 bg-white p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        <span className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          {displayValue}
        </span>
      </div>
      <div className="relative py-2">
        <div className="relative h-2 rounded-full bg-muted/60">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/70 to-primary"
            style={{ width: `${percentage}%` }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-white shadow-md shadow-primary/20"
          style={{ left: `${percentage}%` }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground/50">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function getComparison(annualCost: number): string {
  if (annualCost >= 100000)
    return "Това е първоначална вноска за жилище \u2014 отишла в безцелни запознанства.";
  if (annualCost >= 50000)
    return "Това е луксозна кола. Похарчена за хора, които никога няма да срещнеш.";
  if (annualCost >= 20000)
    return "Това е година обучение. Инвестирана в безсмислени разговори.";
  if (annualCost >= 10000)
    return `Това са ${Math.round(annualCost / 2500)} международни пътувания \u2014 пропилени в празни разговори.`;
  if (annualCost >= 5000)
    return `Това са ${Math.round(annualCost / 1200)} уикенд почивки, които не взе.`;
  return `Това са ${Math.round(annualCost / 150)} страхотни вечери навън \u2014 заменени с палеца ти по екрана.`;
}

function getHoursComparison(annualHours: number): string {
  const workDays = Math.round(annualHours / 8);
  if (workDays >= 30)
    return `${workDays} работни дни. Това е над месец от живота ти \u2014 всяка година.`;
  if (workDays >= 15)
    return `${workDays} пълни работни дни \u2014 три седмици, които никога няма да върнеш.`;
  if (workDays >= 5)
    return `${workDays} пълни работни дни, загубени в дейтинг приложения.`;
  return `${annualHours} часа, които можеха да отидат за нещо истинско.`;
}

export function Calculator({ compact = false }: { compact?: boolean }) {
  const [hourlyRate, setHourlyRate] = useState(150);
  const [hoursPerWeek, setHoursPerWeek] = useState(7);

  const annualHours = hoursPerWeek * 52;
  const annualCost = annualHours * hourlyRate;
  const monthlyCost = Math.round(annualCost / 12);

  return (
    <div>
      {/* Inputs */}
      <div className="space-y-4">
        <SliderInput
          label="Колко печелиш на час"
          value={hourlyRate}
          onChange={setHourlyRate}
          min={25}
          max={500}
          step={25}
          displayValue={`€${hourlyRate}`}
          minLabel="€25"
          maxLabel="€500+"
        />
        <SliderInput
          label="Часове седмично в дейтинг приложения"
          value={hoursPerWeek}
          onChange={setHoursPerWeek}
          min={1}
          max={30}
          step={1}
          displayValue={`${hoursPerWeek}ч`}
          minLabel="1ч"
          maxLabel="30ч"
        />
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {compact ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Губиш приблизително
            </p>
            <AnimatedNumber
              value={annualCost}
              prefix="€"
              className="block font-serif text-5xl font-semibold text-primary sm:text-6xl"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              годишно за запознанства, които не водят до нищо
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              Ами ако един тест замени всичко това с едно единствено,
              смислено запознанство?
            </p>
          </div>
        ) : (
          <div>
            {/* Main result */}
            <div
              className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(135deg, hsl(346, 77%, 50%) 0%, hsl(346, 70%, 40%) 100%)",
              }}
            >
              <div className="relative z-10">
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-white/60">
                  Годишна цена на случайното запознанство
                </p>
                <AnimatedNumber
                  value={annualCost}
                  prefix="€"
                  className="block font-serif text-5xl font-bold text-white sm:text-6xl"
                />
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  {getComparison(annualCost)}
                </p>
              </div>
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/40 bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Месечно
                </p>
                <AnimatedNumber
                  value={monthlyCost}
                  prefix="€"
                  className="mt-2 block font-serif text-2xl font-semibold text-foreground"
                />
              </div>
              <div className="rounded-2xl border border-border/40 bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Часове годишно
                </p>
                <AnimatedNumber
                  value={annualHours}
                  className="mt-2 block font-serif text-2xl font-semibold text-foreground"
                />
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {getHoursComparison(annualHours)}
            </p>

            {/* CTA card */}
            <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ние заменяме всичко това с{" "}
                <span className="font-medium text-foreground">
                  един тест за личността
                </span>{" "}
                и{" "}
                <span className="font-medium text-foreground">
                  едно подбрано запознанство
                </span>{" "}
                с някой, който наистина ти подхожда.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/test">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="rounded-full px-7 py-6 text-base shadow-lg shadow-primary/20"
              >
                Попълни теста
              </Button>
            </motion.div>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground/60">
            5 въпроса. Под 2 минути. Без повече безцелни срещи.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
