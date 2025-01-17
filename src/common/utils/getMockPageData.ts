import { AppRoute } from "../enum";
import { MOCK_HOME_PAGE } from "../mocks/home-page-mock/home-page-mock";
import { MOCK_NOT_FOUND_PAGE } from "../mocks/not-found-page-mock/not-found-page-mock";

export function getMockPageData({
  slug = ``,
}: {
  slug: string
}) {
  switch (`/${slug}`) {
    case AppRoute.HOME:
      return MOCK_HOME_PAGE;

    default:
      return MOCK_NOT_FOUND_PAGE;
  }
}
