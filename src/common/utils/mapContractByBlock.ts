/* eslint-disable no-case-declarations */
import { HomeServicesComponent, SharedHeroComponent } from "../api-types";
import { SharedHeroComponent, SharedTextAndMediaComponent } from "../api-types";
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
    case BlockTypes.SHARED_TEXT_AND_MEDIA:
      const sharedTextAndMediaBlock = block as SharedTextAndMediaComponent;

      return {
        id: sharedTextAndMediaBlock?.id,
        __component: sharedTextAndMediaBlock.__component,
        title: sharedTextAndMediaBlock?.title,
        description: sharedTextAndMediaBlock?.description,
        media: {
          url: sharedTextAndMediaBlock?.media?.data?.attributes?.url,
          alternativeText: sharedTextAndMediaBlock?.media?.data?.attributes?.alternativeText || ``,
          mime: sharedTextAndMediaBlock?.media?.data?.attributes?.mime,
        },
        contentOrder: sharedTextAndMediaBlock?.contentOrder,
        viewFootsteps: sharedTextAndMediaBlock?.viewFootsteps,
      };

    case BlockTypes.HOME_SERVICES:
      const servicesBlock = block as HomeServicesComponent;

      return {
        id: servicesBlock?.id,
        __component: servicesBlock.__component,
        title: servicesBlock.cards?.title,
        phone: servicesBlock.phone,
        email: servicesBlock.email,
        cards: servicesBlock.cards?.cards?.map((card) => ({
          ...card,
          image: {
            url: card.image?.data?.attributes?.url,
            alternativeText: card.image?.data?.attributes?.alternativeText || ``,
          },
        })),
      };

    default:
      return {};
  }
}
