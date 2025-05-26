import qs from "qs";
import { AppRoute } from "../enum";
import { apiFetch } from "./HttpClient";
import { mapContractByBlock } from "./mapContractByBlock";
import { PageData } from "../types";

export async function getPageData({
  slug = ``,
  preview,
}: {
  slug: string;
  preview: boolean;
}) {
  switch (`/${slug}`) {
    case AppRoute.HOME:
      return getData({
        slug: `home`,
        populate: [
          `blocks.infoCard`,
          `blocks.scheduleCard`,
          `blocks.scheduleCard.timetable`,
          `blocks.image`,
          `blocks.media`,
          `blocks.cards`,
          `blocks.cards.cards`,
          `blocks.cards.cards.image`,
          `blocks.cards.cards.labels`,
          `blocks.button`,
          `blocks.largeImage`,
          `blocks.smallImage`,
          `blocks.generalTickets`,
          `blocks.subsidizedTickets.ticketsList`,
          `seo`,
        ],
        preview,
      });

    case AppRoute.CONTACT_ZOO:
      return getData({
        slug,
        populate: [
          `blocks.infoCard`,
          `blocks.scheduleCard`,
          `blocks.scheduleCard.timetable`,
          `blocks.image`,
          `blocks.media`,
          `blocks.subsidizedTickets`,
          `blocks.cards`,
          `blocks.cards.image`,
          `blocks.cards.labels`,
          `seo`,
        ],
        preview,
      });

    case AppRoute.DISCOUNTS:
      return getData({
        slug: `discount-page`,
        populate: [
          `blocks.remark.file`,
          `blocks.rulesCards`,
          `blocks.discountsCards.rules.basis.file`,
          `blocks.discountsCards.rules.docs`,
          `blocks.discountsCards.rules.terms`,
          `seo`,
        ],
        preview,
      });

    case AppRoute.VISITING_RULES:
      return getData({
        slug: `visiting-rules-page`,
        populate: [
          `blocks.documentLink.file`,
          `blocks.mainRules.mainRulesCards.image`,
          `blocks.warningsCards`,
          `blocks.photosPolicyCards`,
          `blocks.emergencyPhonesCards`,
          `seo`,
        ],
        preview,
      });

    default:
      return {
        notFound: true,
      };
  }
}

async function getData({
  slug,
  populate,
  preview,
}: {
  slug: string;
  populate: string[];
  preview: boolean;
}) {
  const pageResponse: PageData = await apiFetch(`/${slug}?${qs.stringify({
    populate,
    status: preview ? `draft` : `published`,
  })}`, {
    isPreview: preview,
  });

  if (!pageResponse) {
    return pageResponse;
  }

  const blocks = pageResponse.data?.blocks?.map((block) => (mapContractByBlock({
    block,
  })));

  return {
    blocks,
    ...(pageResponse.data?.seo && {
      seo: {
        metaTitle: pageResponse.data?.seo.metaTitle,
        metaDescription: pageResponse.data?.seo.metaDescription,
        metaKeywords: pageResponse.data?.seo.keywords,
      },
    }),
  };
}
