import { AppRoute } from "../enum";
import { MOCK_HOME_PAGE } from "../mocks/home-page-mock/home-page-mock";
import { MOCK_CONTACT_ZOO_PAGE } from "../mocks/contact-zoo-page-mock/contact-zoo-page-mock";
import { MOCK_NOT_FOUND_PAGE } from "../mocks/not-found-page-mock/not-found-page-mock";
import { MOCK_INTERNAL_TEST_PAGE } from "../mocks/internal-test-page-mock/internal-test-page-mock";

export function getMockPageData({
  slug = ``,
}: {
  slug: string
}) {
  switch (`/${slug}`) {
    case AppRoute.HOME:
      return MOCK_HOME_PAGE;

    case AppRoute.CONTACT_ZOO:
      return MOCK_CONTACT_ZOO_PAGE;

    case AppRoute.INTERNAL_TEST_PAGE:
      return MOCK_INTERNAL_TEST_PAGE;

    default:
      return MOCK_NOT_FOUND_PAGE;
  }
}
