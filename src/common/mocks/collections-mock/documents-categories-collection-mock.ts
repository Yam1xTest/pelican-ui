import { AppRoute } from "../../enum";
import { CategoryProps } from "../../types";

export const MOCK_DOCUMENTS_CATEGORIES: CategoryProps[] = [
  {
    id: 1,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Отчеты`,
    hasTabs: true,
  },
  {
    id: 2,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Торги`,
    hasTabs: true,
  },
  {
    id: 3,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Учредительные документы и\u00A0реквизиты`,
    hasTabs: false,
  },
  {
    id: 4,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Муниципальные задания и отчёты по\u00A0выполнению муниципального задания`,
    hasTabs: true,
  },
  {
    id: 5,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Закупки`,
    hasTabs: true,
  },
  {
    id: 6,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Приказы`,
    hasTabs: true,
  },
  {
    id: 7,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `О деятельности учреждения`,
    hasTabs: true,
  },
  {
    id: 8,
    pageUrl: `${AppRoute.DOCUMENTS}`,
    title: `Планы Финансово-Хозяйственной Деятельности`,
    hasTabs: true,
  },
];
