"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const faqs = [
  {
    question: "How does the personality test work?",
    answer:
      "It\u2019s based on the Big Five model\u2014the most validated framework in psychology. Fifteen questions, five dimensions: how open you are, how you organize your life, your social energy, your empathy style, and your emotional patterns. Takes about 3 minutes.",
  },
  {
    question: "Is this a dating app?",
    answer:
      "No swiping, no endless scrolling. We\u2019re a curated service. We personally review every profile and only make introductions we genuinely believe in. Think of it as having a very thoughtful friend with a psychology degree.",
  },
  {
    question: "What does it cost?",
    answer:
      "The test and sign-up are free. We\u2019ll reach out to discuss our process and any costs before making introductions.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Securely stored, never sold, never shared with third parties. Used only for matching. You can request deletion anytime.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "Someone from our team personally reviews your profile and reaches out within a few days. No bots, no auto-emails\u2014a real conversation.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="pr-4 text-base font-medium">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-lg text-muted-foreground"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeInUp>
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-20">
            {/* Left — heading */}
            <div className="sm:w-2/5">
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Questions?
                <br />
                <span className="text-muted-foreground">
                  We&apos;ve got answers.
                </span>
              </h2>
            </div>

            {/* Right — accordion */}
            <div className="flex-1">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
