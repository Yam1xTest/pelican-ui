import { VisitingRulesMainComponentProps } from "@/src/common/types";
import { BlockTypes } from "../../../enum";

export const MOCK_VISITING_RULES_MAIN: VisitingRulesMainComponentProps = {
  id: 1,
  __component: BlockTypes.VISITING_RULES_MAIN,
  title: `Правила посещения`,
  link: {
    label: `(Открыть документ с правилами посещения)`,
    path: `/documents/Visiting-rules.pdf`,
  },
  description: `Соблюдайте эти простые правила, чтобы посещение зоопарка прошло безопасно для\u00A0Вас и для питомцев зоопарка.`,
  cardsTitle: `Приобретая билет, вы соглашаетесь с\u00A0правилами посещения зоопарка:`,
  cards: [
    {
      id: 0,
      label: `Дети до 13 лет (включительно) могут посещать зоопарк только в\u00A0сопровождении взрослых.`,
      iconUrl: `/images/svg/no-breaking.svg`,
    },
    {
      id: 1,
      label: `Запрещены колесные гаджеты.`,
      iconUrl: `/images/svg/no-scooter.svg`,
    },
    {
      id: 2,
      label: `Не кормить животных.`,
      iconUrl: `/images/svg/no-food.svg`,
    },
    {
      id: 3,
      label: `Не приводить животных.`,
      iconUrl: `/images/svg/no-pets.svg`,
    },
    {
      id: 4,
      label: `Не курить.`,
      iconUrl: `/images/svg/no-smoking.svg`,
    },
    {
      id: 5,
      label: `Не распивать спиртные напитки.`,
      iconUrl: `/images/svg/no-alcohol.svg`,
    },
    {
      id: 6,
      label: `Не дразнить животных.`,
      iconUrl: `/images/svg/no-teasing.svg`,
    },
    {
      id: 7,
      label: `Не засовывать ничего в\u00A0клетки.`,
      iconUrl: `/images/svg/no-sticking-objects-into-cages.svg`,
    },
    {
      id: 8,
      label: `Не перелазить ограждения.`,
      iconUrl: `/images/svg/no-climbing.svg`,
    },
    {
      id: 9,
      label: `Не трогать животных.`,
      iconUrl: `/images/svg/no-touching.svg`,
    },
    {
      id: 10,
      label: `Не шуметь.`,
      iconUrl: `/images/svg/no-noise.svg`,
    },
  ],
};
