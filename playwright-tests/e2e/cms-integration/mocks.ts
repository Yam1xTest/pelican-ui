import { BlockTypes } from "@/src/common/enum";
import { E2E_UI_NAME_PREFIX } from "./helpers/cms-integration-helpers";

export const TEST_MOCK_HERO = {
  __component: BlockTypes.SHARED_HERO,
  title: `${E2E_UI_NAME_PREFIX} Челябинский зоопарк`,
  infoCard: {
    title: `29 октября зоопарк не работает`,
    description: `Каждый последний понедельник месяца санитарный день.`,
  },
  scheduleCard: {
    title: `График работы`,
    timetable: [
      {
        days: `Понедельник - четверг`,
        time: `10:00-18:00`,
        ticketsOfficeTime: `(вход и касса 10:00-17:00)`,
      },
    ],
  },
};
