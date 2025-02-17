import { BlockTypes } from "../../../enum";
import { SharedTicketsComponentProps } from '../../../types';

export const MOCK_CONTACT_ZOO_TICKETS: SharedTicketsComponentProps = {
  id: 5,
  __component: BlockTypes.SHARED_TICKETS,
  title: `Билеты`,
  subtitle: `Купить билет можно только на\u00A0кассе контактного зоопарка.`,
  note: `Билет контактного зоопарка приобретается дополнительно ко\u00A0входному билету зоопарка`,
  tickets: [
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
