import { MOCK_HERO } from "./blocks/hero-mock";
import { MOCK_TICKETS } from "./blocks/tickets-mock";
import { ContactZooProps } from "../../types";

export const MOCK_CONTACT_ZOO: ContactZooProps = {
  id: 1,
  title: `Челябинский зоопарк: контактный зоопарк`,
  blocks: [MOCK_HERO, MOCK_TICKETS],
};
