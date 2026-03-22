"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const faqs = [
  {
    question: "How does the personality test work?",
    answer:
      "Our test is based on the Big Five personality model, the gold standard in psychology. You\u2019ll answer 15 questions that measure five core dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability. It takes about 3 minutes.",
  },
  {
    question: "Is this a dating app?",
    answer:
      "Not exactly. We\u2019re a curated matchmaking service. Instead of endless swiping, we personally review profiles and introduce people we believe are genuinely compatible. Think of us as a thoughtful friend who happens to know a lot about psychology.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Taking the personality test and signing up is completely free. We\u2019ll reach out to discuss our matching process and any associated costs before making any introductions.",
  },
  {
    question: "How do you protect my data?",
    answer:
      "Your test results and personal information are stored securely and never shared with third parties. We only use your data to find compatible matches, and you can request deletion at any time.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "After you complete the test and provide your email, a member of our team will personally review your profile. We\u2019ll reach out within a few days to introduce ourselves and discuss next steps.",
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
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="pr-4 text-base font-medium sm:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-xl text-muted-foreground"
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
      <div className="mx-auto max-w-3xl px-6">
        <FadeInUp>
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="mt-12">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
