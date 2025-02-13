import excursionImage from "@/public/images/services/excursion.png";
import questImage from "@/public/images/services/quest.png";
import contactLessonImage from "@/public/images/services/contact-lesson.png";
import { CardsComponentProps } from "@/src/common/types";
import { BlockTypes } from "@/src/common/enum";

export const MOCK_SHARED_CARDS: CardsComponentProps = {
  id: 0,
  __component: BlockTypes.SHARED_CARDS,
  title: `Наши услуги`,
  cards: [
    {
      id: 0,
      image: {
        url: excursionImage,
        alternativeText: `Фотография процесса проведения экскурсии`,
      },
      labels: [
        {
          id: 0,
          text: `Запись за 5 дней`,
        },
      ],
      title: `Экскурсии`,
      description: `Увидите основные экспозиции и\u00A0узнаете много\u00A0интересных фактов об\u00A0обитателях нашего\u00A0зоопарка.`,
    },
    {
      id: 1,
      image: {
        url: questImage,
        alternativeText: `Фотография процесса проведения квеста`,
      },
      title: `Квесты`,
      description: `В форме квеста-путешествия разгадаете загадки и\u00A0узнаете интересные факты о\u00A0наших животных.`,
    },
    {
      id: 2,
      image: {
        url: contactLessonImage,
        alternativeText: `Фотография процесса проведения контактного занятия`,
      },
      labels: [
        {
          id: 0,
          text: `Запись за 5 дней`,
        },
        {
          id: 1,
          text: `От 5 человек`,
        },
      ],
      title: `Контактные занятия`,
      description: `Познакомитесь ближе с\u00A0разными видами животных и\u00A0научитесь бережному общению с\u00A0питомцем.`,
    },
  ],
};
