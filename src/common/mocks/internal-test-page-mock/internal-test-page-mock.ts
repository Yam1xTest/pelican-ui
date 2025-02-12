import { MOCK_IMAGE_WITH_BUTTON_GRID } from "./blocks/image-with-button-grid-mock";
import { HomePageProps } from "../../types";

export const MOCK_INTERNAL_TEST_PAGE: HomePageProps = {
  seo: {
    metaTitle: `Челябинский зоопарк: главная страница`,
    metaDescription: `Описание главной страницы`,
  },
  blocks: [MOCK_IMAGE_WITH_BUTTON_GRID],
};
