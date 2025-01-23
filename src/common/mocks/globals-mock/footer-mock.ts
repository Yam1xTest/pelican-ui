import iconAdministration1 from '@/public/images/footer/adm1.png';
import iconAdministration2 from '@/public/images/footer/adm2.png';
import { AppRoute } from '../../enum';
import { GlobalComponentProps } from '../../types';

export const MOCK_FOOTER_NAV_TITLE_LEFT = `Посетителям`;
export const MOCK_FOOTER_NAV_TITLE_RIGHT = `О зоопарке`;

export const MOCK_FOOTER_USER_LINKS: GlobalComponentProps['footerUserLinks'] = [
  {
    id: 1,
    name: `Льготы`,
    link: `https://vk.com/topic-71671982_48253263`,
  },
  // TODO: Uncomment when the page appears
  // {
  //   id: 2,
  //   name: `Услуги`,
  //   link: `#`,
  // },
];

export const MOCK_FOOTER_ABOUT_LINKS: GlobalComponentProps['footerAboutLinks'] = [
  {
    id: 1,
    name: `Новости`,
    link: AppRoute.NEWS,
  },
  {
    id: 2,
    name: `Документы`,
    link: AppRoute.DOCUMENTS,
  },
  // TODO: Uncomment when the page appears
  // {
  //   id: 3,
  //   name: `Правила посещения`,
  //   link: `#`,
  // },
  {
    id: 4,
    name: `Оставить отзыв`,
    link: `https://docs.google.com/forms/d/11AMCo0nMCon6-_VX07lrWRhniSAd0Dei-gl1m_DS1Y0/viewform?hl=ru&hl=ru&edit_requested=true`,
  },
];

export const MOCK_OFFICIAL_LINKS: GlobalComponentProps['officialLinks'] = [
  {
    id: 1,
    name: `Управление культуры администрации\u00A0г.\u00A0Челябинска`,
    link: `https://kultura174.ru/`,
    icon: iconAdministration1,
    alt: `Иконка`,
  },
  {
    id: 2,
    name: `Министерство культуры Челябинской области`,
    link: `https://mincult.gov74.ru/`,
    icon: iconAdministration2,
    alt: `Иконка`,
  },
  {
    id: 3,
    name: `Администрация г.\u00A0Челябинска`,
    link: `https://cheladmin.ru/`,
    icon: iconAdministration1,
    alt: `Иконка`,
  },
];
