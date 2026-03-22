"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SuccessStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
            Истинска история
          </p>

          <h3 className="font-serif text-2xl font-semibold leading-snug sm:text-3xl">
            Как Мария и Димитър се срещнаха чрез{" "}
            <span className="text-primary">1NTENT</span>
          </h3>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Мария попълни теста след дълга пауза от запознанства. Искаше нещо различно
              от безкрайното преглеждане на профили. След въвеждащ разговор с нашия екип,
              изградихме нейния профил.
            </p>
            <p>
              Димитър се регистрира два дни по-късно. Профилите им съвпаднаха по 4 от 5
              измерения. Предложихме среща и двамата се съгласиха.
            </p>
            <p className="font-medium text-foreground">
              Днес са заедно от 8 месеца.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                src="https://i.pravatar.cc/48?img=47"
                alt=""
                className="h-10 w-10 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://i.pravatar.cc/48?img=11"
                alt=""
                className="h-10 w-10 rounded-full border-2 border-background object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Мария и Димитър
              </p>
              <p className="text-xs text-muted-foreground">
                Съвпадение: 87%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
