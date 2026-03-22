import { Question } from "@/types";

export const questions: Question[] = [
  // Openness
  {
    id: "o1",
    text: "I enjoy trying new and unfamiliar experiences.",
    dimension: "openness",
  },
  {
    id: "o2",
    text: "I have a vivid imagination and rich inner life.",
    dimension: "openness",
  },
  {
    id: "o3",
    text: "I'm curious about many different topics and ideas.",
    dimension: "openness",
  },

  // Conscientiousness
  {
    id: "c1",
    text: "I like to keep things organized and in order.",
    dimension: "conscientiousness",
  },
  {
    id: "c2",
    text: "I follow through on my commitments and plans.",
    dimension: "conscientiousness",
  },
  {
    id: "c3",
    text: "I pay attention to details in my work.",
    dimension: "conscientiousness",
  },

  // Extraversion
  {
    id: "e1",
    text: "I feel energized when I'm around other people.",
    dimension: "extraversion",
  },
  {
    id: "e2",
    text: "I'm usually the one to start conversations at social events.",
    dimension: "extraversion",
  },
  {
    id: "e3",
    text: "I prefer being in a group rather than spending time alone.",
    dimension: "extraversion",
  },

  // Agreeableness
  {
    id: "a1",
    text: "I genuinely care about other people's well-being.",
    dimension: "agreeableness",
  },
  {
    id: "a2",
    text: "I tend to trust others and give them the benefit of the doubt.",
    dimension: "agreeableness",
  },
  {
    id: "a3",
    text: "I prefer cooperation over competition.",
    dimension: "agreeableness",
  },

  // Neuroticism (reverse-scored for "emotional stability")
  {
    id: "n1",
    text: "I often worry about things that might go wrong.",
    dimension: "neuroticism",
  },
  {
    id: "n2",
    text: "My mood can change quickly throughout the day.",
    dimension: "neuroticism",
  },
  {
    id: "n3",
    text: "I find it hard to relax when I'm under pressure.",
    dimension: "neuroticism",
  },
];
