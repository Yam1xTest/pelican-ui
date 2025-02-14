import { CardsComponentProps } from "@/src/common/types";
import { BlockTypes } from "@/src/common/enum";
import { MOCK_SERVICES } from "../../home-page-mock/blocks/services-mock";

export const MOCK_SHARED_CARDS: CardsComponentProps = {
  id: 0,
  __component: BlockTypes.SHARED_CARDS,
  title: `Наши услуги`,
  cards: MOCK_SERVICES.cards,
};
