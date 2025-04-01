import { DiscountsPageProps } from "../../types";
import { MOCK_DISCOUNTS_CATEGORIES } from "./blocks/discounts-categories-mock";
import { MOCK_DISCOUNTS_HERO } from "./blocks/discounts-hero-mock";

export const MOCK_DISCOUNTS_PAGE: DiscountsPageProps = {
  seo: {
    metaTitle: `Льготы`,
    metaDescription: `Описание страницы льгот`,
  },
  blocks: [MOCK_DISCOUNTS_HERO, MOCK_DISCOUNTS_CATEGORIES],
};
