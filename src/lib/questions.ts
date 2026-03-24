import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    text: "Когато си представяш идеалната неделна сутрин, как изглежда тя?",
    type: "choice",
    options: [
      { label: "Тихо кафе и разговор вкъщи", value: "calm" },
      { label: "Активно навън — поход, спорт, природа", value: "active" },
      { label: "Бранч с близки приятели", value: "social" },
      { label: "Догонване на работа или лични проекти", value: "driven" },
    ],
  },
  {
    id: "q2",
    text: "Кое те е разочаровало най-много в съвременните запознанства?",
    type: "choice",
    options: [
      { label: "Хора, които не са сериозни за ангажираност", value: "commitment" },
      { label: "Липса на безопасност и фалшиви профили", value: "safety" },
      { label: "Твърде много избор, твърде малко дълбочина", value: "depth" },
      { label: "Губене на време с несъвместими хора", value: "time" },
    ],
  },
  {
    id: "q3",
    text: "По скала от 1 до 5, колко готов/а си точно сега за сериозна връзка?",
    type: "scale",
    min: 1,
    max: 5,
    minLabel: "Не съвсем",
    maxLabel: "Напълно!",
  },
  {
    id: "q4",
    text: "Коя фраза те описва най-добре във връзка?",
    type: "choice",
    options: [
      { label: "Показвам любов чрез действия", value: "actions" },
      { label: "Нуждая се от дълбоки емоционални разговори", value: "emotional" },
      { label: "Физическата близост означава всичко", value: "physical" },
      { label: "Нуждая се от лично пространство, за да се чувствам сигурно", value: "space" },
    ],
  },
  {
    id: "q5",
    text: "Излизал/а си 3 пъти с някого. Нещата вървят добре. Какво те притеснява най-много?",
    type: "choice",
    options: [
      { label: "Ще изчезнат ли внезапно?", value: "ghosting" },
      { label: "Говорят ли с 10 други хора?", value: "exclusivity" },
      { label: "Съвпадат ли наистина целите ни?", value: "alignment" },
      { label: "Те ли са, за когото се представят?", value: "authenticity" },
    ],
  },
  {
    id: "q6",
    text: "Кое е най-важно за теб в дългосрочен партньор?",
    type: "choice",
    options: [
      { label: "Емоционална интелигентност и емпатия", value: "empathy" },
      { label: "Амбиция и споделена жизнена визия", value: "ambition" },
      { label: "Стабилност, надеждност и доверие", value: "stability" },
      { label: "Страст, химия и привличане", value: "passion" },
    ],
  },
  {
    id: "q7",
    text: "Довърши изречението: 'Търся човек, който...'",
    type: "open",
    placeholder: "Напиши с няколко думи...",
  },
];
