import { BlockTypes } from "../../../enum";
import { TicketsComponentProps } from '../../../types';

export const MOCK_CONTACT_ZOO_TICKETS: TicketsComponentProps = {
  id: 5,
  __component: BlockTypes.CONTACT_ZOO_TICKETS,
  generalTicketsTitle: `Билеты`,
  generalTicketsSubtitle: `Купить билет можно только на\u00A0кассе контактного зоопарка.`,
  contactZooNote: `Билет контактного зоопарка приобретается дополнительно ко\u00A0входному билету зоопарка`,
  generalTickets: [
    {
      id: 0,
      category: `Дети до 2 лет`,
      description: `Требуется подтверждающий документ.`,
      price: `Бесплатно`,
      theme: `Зелёный`,
    },
    {
      id: 1,
      category: `Взрослые, дети\u00A0от\u00A03\u00A0лет`,
      price: `100  ₽ / чел`,
      theme: `Коричневый`,
    },
  ],
};
