
import noFoodImage from '@/public/images/tickets-popup/no-food.png';
import noBreakingImage from '@/public/images/tickets-popup/no-breaking.png';
import noClimbingImage from '@/public/images/tickets-popup/no-climbing.png';
import noPetsImage from '@/public/images/tickets-popup/no-pets.png';
import noScooterImage from '@/public/images/tickets-popup/no-scooter.png';
import noSmokingImage from '@/public/images/tickets-popup/no-smoking.png';
import noTouchingImage from '@/public/images/tickets-popup/no-touching.png';
import noTeasingImage from '@/public/images/tickets-popup/no-teasing.png';
import { GlobalComponentProps } from '../../types';

export const MOCK_POPUP_TICKET_BUY_TEXT = `Билеты`;
export const MOCK_TICKET_BUY_LINK = `https://widget.afisha.yandex.ru/w/sessions/ticketsteam-803@37605507?clientKey=3bc42fbd-a832-49aa-a269-79188e18d9e1&regionId=56`;

export const MOCK_TICKETS_POPUP_GENERAL: GlobalComponentProps['ticketsPopupGeneral'] = [
  {
    id: 0,
    category: `Взрослые, дети\u00A0от\u00A014\u00A0лет`,
    price: `400  ₽ / чел`,
  },
  {
    id: 1,
    category: `Дети от 5 до 13 лет`,
    description: ` Требуется оригинал документа`,
    price: `200  ₽ / чел`,
  },
  {
    id: 2,
    category: `Дети до 4 лет`,
    description: `Требуется оригинал документа`,
    price: `Бесплатно`,
  },
];

export const MOCK_TICKETS_POPUP_SUBSIDIZED: GlobalComponentProps['ticketsPopupSubsidized'] = [
  {
    id: 0,
    category: `Студенты`,
    price: `200  ₽ / чел`,
  },
  {
    id: 1,
    category: `Пенсионеры`,
    price: `200  ₽ / чел`,
  },
  {
    id: 2,
    category: `Многодетные семьи (1 раз в месяц)`,
    price: `Бесплатно`,
  },
  {
    id: 3,
    category: `Инвалиды I группы с сопровождающим`,
    price: `Бесплатно`,
  },
  {
    id: 4,
    category: `Инвалиды II группы`,
    price: `Бесплатно`,
  },
];

export const MOCK_TICKETS_POPUP_RULES_IMAGES: GlobalComponentProps['ticketsPopupRulesImages'] = [
  {
    url: noFoodImage,
    alternativeText: `Нельзя кормить животных`,
  },
  {
    url: noPetsImage,
    alternativeText: `Нельзя с домашними животными`,
  },
  {
    url: noSmokingImage,
    alternativeText: `Нельзя курить`,
  },
  {
    url: noScooterImage,
    alternativeText: `Нельзя ездить на самокате`,
  },
  {
    url: noClimbingImage,
    alternativeText: `Нельзя перелезать через ограждение`,
  },
  {
    url: noTouchingImage,
    alternativeText: `Нельзя трогать животных`,
  },
  {
    url: noTeasingImage,
    alternativeText: `Нельзя дразнить животных`,
  },
  {
    url: noBreakingImage,
    alternativeText: `Нельзя ломать деревья`,
  },
];

export const MOCK_TICKETS_POPUP_REFUND_REASONS: GlobalComponentProps['ticketsPopupRefundReasons'] = [
  {
    id: 0,
    refundReason: `отмены, замены либо переноса оказания услуги по инициативе Зоопарка;`,
  },
  {
    id: 1,
    // eslint-disable-next-line @stylistic/max-len
    refundReason: `отказа от оказания услуг посетителем по уважительным причинам (болезнь, смерть члена семьи или близкого родственника, и т.п.), при предъявлении подтверждающих документов;`,
  },
  {
    id: 2,
    refundReason: `в иных случаях по решению директора.`,
  },
];
