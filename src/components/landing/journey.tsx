"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Попълни теста и запази час",
    description:
      "Отговори на кратък тест за личността и остави имейла си. Ако имаш интерес, запази въвеждащ разговор, за да научим повече за това какво търсиш.",
  },
  {
    title: "Създаваме профила ти",
    description:
      "След като бъдеш приет/а в програмата, изграждаме подробен профил около твоята личност, ценности и какво е най-важно за теб в партньор.",
  },
  {
    title: "Разгледай съвпаденията си",
    description:
      "Предлагаме ти съвместими кандидати на базата на профила ти. Ти избираш кой те интересува, а те ще имат възможност да отговорят.",
  },
  {
    title: "Ние организираме срещата",
    description:
      "При взаимен интерес ние се грижим за логистиката \u2014 време, място, всичко. Ти просто се появяваш и си ти.",
  },
];

function StepItem({ step, index, total }: { step: typeof steps[0]; index: number; total: number }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer py-8 pl-20 sm:pl-24"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive((v) => !v)}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Connector line segment — between circles, not through them */}
      {index < total - 1 && (
        <div
          className="absolute left-[23px] top-[60px] bottom-[-32px] w-px sm:left-[27px]"
          style={{
            background: "linear-gradient(to bottom, hsl(346, 77%, 70%), hsl(346, 50%, 85%))",
          }}
        />
      )}

      {/* Circle node */}
      <motion.div
        className="absolute left-0 top-8 z-10 flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 sm:h-[56px] sm:w-[56px]"
        animate={{
          backgroundColor: isActive ? "hsl(346, 77%, 50%)" : "hsl(0, 0%, 100%)",
          borderColor: isActive ? "hsl(346, 77%, 50%)" : "hsl(346, 60%, 80%)",
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive
            ? "0 0 20px hsla(346, 77%, 50%, 0.3), 0 0 40px hsla(346, 77%, 50%, 0.1)"
            : "0 0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <motion.span
          className="text-sm font-bold sm:text-base"
          animate={{
            color: isActive ? "hsl(0, 0%, 100%)" : "hsl(346, 77%, 50%)",
          }}
          transition={{ duration: 0.2 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </motion.div>

      {/* Content */}
      <div>
        <motion.h3
          className="font-serif text-xl font-semibold sm:text-2xl"
          animate={{
            color: isActive ? "hsl(346, 77%, 45%)" : "hsl(20, 20%, 18%)",
          }}
          transition={{ duration: 0.25 }}
        >
          {step.title}
        </motion.h3>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.08 },
              }}
            >
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Journey() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Стъпка по стъпка
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            От тест до{" "}
            <span className="italic text-primary">среща</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
