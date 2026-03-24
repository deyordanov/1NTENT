"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const faqs = [
  {
    question: "Как работи тестът?",
    answer:
      "Тестът е разработен от нашия екип експерт-психолози и включва 7 въпроса, които разкриват основните ти нагласи към връзките. На базата на отговорите получаваш личностен профил, който използваме за подбора на съвместими кандидати.",
  },
  {
    question: "Това дейтинг приложение ли е?",
    answer:
      "Не. Без безкрайно прелистване на профили. Ние сме подбрана услуга за мачмейкинг. Лично преглеждаме всеки профил и правим запознанства само когато наистина вярваме в съвместимостта.",
  },
  {
    question: "Колко струва?",
    answer:
      "Тестът и регистрацията са напълно безплатни. След въвеждащ разговор ще обсъдим процеса и условията, преди да започнем активен подбор.",
  },
  {
    question: "Как се обработват данните ми?",
    answer:
      "Данните ти се съхраняват сигурно и никога не се продават или споделят с трети страни. Използват се единствено от нашия екип за целите на мачмейкинга. Можеш да поискаш изтриване по всяко време.",
  },
  {
    question: "Какво се случва, след като се регистрирам?",
    answer:
      "Член от нашия екип лично преглежда профила ти и се свързва с теб в рамките на няколко дни за кратък въвеждащ разговор. Без ботове, без автоматични имейли.",
  },
  {
    question: "Кой стои зад тестовете?",
    answer:
      "Тестовете са създадени от екип от експерт-психолози, специализирани в областта на личностната и релационна психология. Въпросите са базирани на утвърдени научни модели и адаптирани за целите на мачмейкинга.",
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
      <div className="mx-auto max-w-2xl px-6">
        <FadeInUp>
          <h2 className="mb-10 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Въпроси?{" "}
            <span className="text-muted-foreground">
              Имаме отговори.
            </span>
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
