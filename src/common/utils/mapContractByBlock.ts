/* eslint-disable no-case-declarations */
import { SharedHeroComponent } from "../api-types";
import { BlockTypes } from "../enum";
import { Block } from "../types";

export function mapContractByBlock({
  block,
}: {
  block: Block
}) {
  switch (`${block.__component}`) {
    case BlockTypes.SHARED_HERO:
      const sharedHeroBlock = block as SharedHeroComponent;

      return {
        id: sharedHeroBlock?.id,
        title: sharedHeroBlock?.title,
        __component: sharedHeroBlock.__component,
        image: {
          url: sharedHeroBlock?.image?.data?.attributes?.url,
          alternativeText: sharedHeroBlock?.image?.data?.attributes?.alternativeText || ``,
        },
        scheduleTitle: sharedHeroBlock?.scheduleCard?.title,
        scheduleTimetables: sharedHeroBlock?.scheduleCard?.timetable,
        infoCardTitle: sharedHeroBlock?.infoCard?.title,
        infoCardDescription: sharedHeroBlock?.infoCard?.description,
      };

    default:
      return {};
  }
}
