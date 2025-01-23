import heroImage from '@/public/images/hero/hero-main-page.png';
import { BlockTypes } from "../../../enum";
import { HeroComponentProps } from '../../../types';

export const MOCK_HERO: HeroComponentProps = {
  id: 1,
  __component: BlockTypes.HERO,
  title: `Контактный зоопарк`,
  image: {
    url: heroImage,
    alternativeText: ``,
  },
  scheduleTitle: `График работы`,
  scheduleTimetables: [
    {
      id: 0,
      days: `Понедельник - четверг`,
      time: `Выходной`,
      ticketsOfficeTime: ``,
    },
    {
      id: 1,
      days: `Пятница – воскресенье, праздники`,
      time: `11:00-16:00`,
      ticketsOfficeTime: `(вход и касса 11:00-15:30)`,
    },
  ],
  infoCardTitle: ``,
  infoCardDescription: `При дожде, снегопаде, граде, метели детский контактный зоопарк временно закрывается для безопасности животных.`,
};
