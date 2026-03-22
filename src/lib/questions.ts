import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "o1",
    text: "Обичам да опитвам нови и непознати преживявания.",
    dimension: "openness",
  },
  {
    id: "e1",
    text: "Чувствам се зареден/а, когато съм сред хора.",
    dimension: "extraversion",
  },
  {
    id: "c1",
    text: "Изпълнявам ангажиментите и плановете си.",
    dimension: "conscientiousness",
  },
  {
    id: "a1",
    text: "Истински ми пука за благополучието на другите хора.",
    dimension: "agreeableness",
  },
  {
    id: "n1",
    text: "Често се тревожа за неща, които могат да се объркат.",
    dimension: "neuroticism",
  },
  {
    id: "o2",
    text: "Вдъхновявам се от изкуство, музика или природа.",
    dimension: "openness",
  },
  {
    id: "e2",
    text: "Предпочитам тих вечер вкъщи пред шумно парти.",
    dimension: "extraversion",
    reverse: true,
  },
  {
    id: "c2",
    text: "Подреден/а съм и обичам да имам ясна структура.",
    dimension: "conscientiousness",
  },
  {
    id: "a2",
    text: "Лесно прощавам, дори когато са ме наранили.",
    dimension: "agreeableness",
  },
  {
    id: "n2",
    text: "Бързо се възстановявам след стресови ситуации.",
    dimension: "neuroticism",
    reverse: true,
  },
];
