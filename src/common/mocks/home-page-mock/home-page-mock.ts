import { HomePageProps } from "../../types";
import { MOCK_CONTACT_ZOO_PREVIEW } from "./contact-zoo-preview-mock";
import { MOCK_HERO } from "./hero-mock";
import { MOCK_MAP } from "./map-mock";
import { MOCK_SERVICES } from "./services-mock";
import { MOCK_TICKETS } from "./tickets-mock";
import { MOCK_TEXT_AND_MEDIA } from "./text-and-media-mock";

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
