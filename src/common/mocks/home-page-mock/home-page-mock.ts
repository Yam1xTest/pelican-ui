import { HomePageProps } from "../../types";
import { MOCK_CONTACT_ZOO_PREVIEW } from "./blocks/contact-zoo-preview-mock";
import { MOCK_HERO } from "./blocks/hero-mock";
import { MOCK_MAP } from "./blocks/map-mock";
import { MOCK_SERVICES } from "./blocks/services-mock";
import { MOCK_TICKETS } from "./blocks/tickets-mock";
import { MOCK_TEXT_AND_MEDIA } from "./blocks/text-and-media-mock";

export const MOCK_HOME_PAGE: HomePageProps = {
  id: 1,
  title: `Домашняя страница`,
  blocks: [
    MOCK_HERO,
    MOCK_TEXT_AND_MEDIA,
    MOCK_SERVICES,
    MOCK_CONTACT_ZOO_PREVIEW,
    MOCK_TICKETS,
    MOCK_MAP,
  ],
};
