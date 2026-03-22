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
    return "Това е първоначална вноска за жилище \u2014 отишла в свайпване.";
  if (annualCost >= 50000)
    return "Това е луксозна кола. Похарчена за хора, които никога няма да срещнеш.";
  if (annualCost >= 20000)
    return "Това е година обучение. Инвестирана в безсмислени разговори.";
  if (annualCost >= 10000)
    return `Това са ${Math.round(annualCost / 2500)} международни пътувания \u2014 пропилени в празни чатове.`;
  if (annualCost >= 5000)
    return `Това са ${Math.round(annualCost / 1200)} уикенд почивки, които не взе.`;
  return `Това са ${Math.round(annualCost / 150)} страхотни вечери навън \u2014 заменени с безцелно скролване.`;
}

function getHoursComparison(annualHours: number): string {
  const workDays = Math.round(annualHours / 8);
  if (workDays >= 30)
    return `${workDays} работни дни. Това е над месец от живота ти \u2014 всяка година.`;
  if (workDays >= 15)
    return `${workDays} пълни работни дни \u2014 три седмици, които никога няма да върнеш.`;
  if (workDays >= 5)
    return `${workDays} пълни работни дни, загубени в безцелно свайпване.`;
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
      <div className="space-y-8">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Твоята часова ставка
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

        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Часове седмично в дейтинг приложения
            </label>
            <span className="font-serif text-2xl font-semibold">
              {hoursPerWeek}ч
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
            <span>1ч</span>
            <span>30ч</span>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-10"
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
              prefix="$"
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
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Годишна цена на случайното запознанство
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
                  Месечна цена
                </p>
                <AnimatedNumber
                  value={monthlyCost}
                  prefix="$"
                  className="mt-1 block font-serif text-2xl font-semibold"
                />
              </div>
              <div className="rounded-xl border border-border/40 bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Часове годишно
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
                Попълни теста &rarr;
              </Button>
            </motion.div>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground/60">
            5 въпроса. Под 2 минути. Без повече свайпване.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
