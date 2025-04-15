import { CategoryProps } from "../../types";

export const MOCK_DOCUMENTS_CATEGORIES: Omit<CategoryProps, 'pageUrl'>[] = [
  {
    id: 1,
    title: `Отчеты`,
    slug: `otchety`,
    hasTabs: true,
  },
  {
    id: 2,
    title: `Торги`,
    slug: `torgi`,
    hasTabs: true,
  },
  {
    id: 3,
    title: `Учредительные документы и\u00A0реквизиты`,
    slug: `uchreditelnie-dokumenti-i-rekviziti`,
    hasTabs: false,
  },
  {
    id: 4,
    title: `Муниципальные задания и отчёты по выполнению муниципального задания`,
    slug: `munitsipalnie-zadaniya-i-otchyoti-po-vipolneniyu-munitsipalnogo-zadaniya`,
    hasTabs: true,
  },
  {
    id: 5,
    title: `Закупки`,
    slug: `zakupki`,
    hasTabs: true,
  },
  {
    id: 6,
    title: `Приказы`,
    slug: `prikazi`,
    hasTabs: true,
  },
  {
    id: 7,
    title: `О деятельности учреждения`,
    slug: `o-deyatelnosti-uchrezhdeniya`,
    hasTabs: true,
  },
  {
    id: 8,
    title: `Планы Финансово-Хозяйственной Деятельности`,
    slug: `plani-finansovo-khozyaistvennoi-deyatelnosti`,
    hasTabs: true,
  },
];
