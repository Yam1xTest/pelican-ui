import { AppRoute } from "../../enum";
import { GlobalComponentProps } from "../../types";

export const MOCK_NAVIGATION_LINKS: GlobalComponentProps['navigationLinks'] = [
  {
    id: 1,
    name: `Льготы`,
    link: `#`,
  },
  {
    id: 2,
    name: `Правила посещения`,
    link: `#`,
  },
  {
    id: 3,
    name: `Адрес`,
    link: `#`,
  },
  {
    id: 4,
    name: `Услуги`,
    link: `#`,
  },
  {
    id: 5,
    name: `Документы`,
    link: AppRoute.DOCUMENTS,
  },
  {
    id: 6,
    name: `Новости`,
    link: AppRoute.NEWS,
  },
];
