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

function getComparison(annualCost: number): string {
  if (annualCost >= 100000)
    return `That\u2019s a down payment on a house \u2014 gone to swiping.`;
  if (annualCost >= 50000)
    return `That\u2019s a luxury car. Spent on people you\u2019ll never meet.`;
  if (annualCost >= 20000)
    return `That\u2019s a year of tuition. Invested in dead-end conversations.`;
  if (annualCost >= 10000)
    return `That\u2019s ${Math.round(annualCost / 2500)} international trips \u2014 wasted on small talk.`;
  if (annualCost >= 5000)
    return `That\u2019s ${Math.round(annualCost / 1200)} weekend getaways you didn\u2019t take.`;
  return `That\u2019s ${Math.round(annualCost / 150)} great nights out \u2014 replaced by thumb fatigue.`;
}

function getHoursComparison(annualHours: number): string {
  const workDays = Math.round(annualHours / 8);
  if (workDays >= 30)
    return `${workDays} work days. That\u2019s over a month of your life \u2014 every single year.`;
  if (workDays >= 15)
    return `${workDays} full work days \u2014 three weeks you\u2019ll never get back.`;
  if (workDays >= 5)
    return `${workDays} full work days lost to aimless swiping.`;
  return `${annualHours} hours that could have gone toward something real.`;
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
      <div className="space-y-8">
        {/* Hourly rate */}
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Your hourly rate
            </label>
            <span className="font-serif text-2xl font-semibold">
              ${hourlyRate}
            </span>
          </div>
          <input
            type="range"
            min={25}
            max={500}
            step={25}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground/60">
            <span>$25</span>
            <span>$500+</span>
          </div>
        </div>

        {/* Hours per week */}
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Hours per week on dating apps
            </label>
            <span className="font-serif text-2xl font-semibold">
              {hoursPerWeek}h
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground/60">
            <span>1h</span>
            <span>30h</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {compact ? (
          /* Compact: one big number + push */
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              You&apos;re losing roughly
            </p>
            <AnimatedNumber
              value={annualCost}
              prefix="$"
              className="block font-serif text-5xl font-semibold text-primary sm:text-6xl"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              per year on dating that goes nowhere
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              What if one test could replace all of it with a single,
              meaningful introduction?
            </p>
          </div>
        ) : (
          /* Full: all stats */
          <div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Your annual romantic opportunity cost
              </p>
              <AnimatedNumber
                value={annualCost}
                prefix="$"
                className="block font-serif text-4xl font-semibold text-primary sm:text-5xl"
              />
              <p className="mt-3 text-muted-foreground">
                {getComparison(annualCost)}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Monthly cost
                </p>
                <AnimatedNumber
                  value={monthlyCost}
                  prefix="$"
                  className="mt-1 block font-serif text-2xl font-semibold"
                />
              </div>
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Hours per year
                </p>
                <AnimatedNumber
                  value={annualHours}
                  className="mt-1 block font-serif text-2xl font-semibold"
                />
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {getHoursComparison(annualHours)}
            </p>

            <div className="mt-6 rounded-xl bg-primary/[0.04] p-5 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                We replace all of that with{" "}
                <span className="font-medium text-foreground">
                  one personality test
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">
                  one curated introduction
                </span>{" "}
                to someone who actually fits.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
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
                Take the test instead &rarr;
              </Button>
            </motion.div>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground/60">
            5 questions. Under 2 minutes. No more swiping.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
