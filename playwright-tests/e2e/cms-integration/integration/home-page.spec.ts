import { gotoPage, setViewportSize } from "@/playwright-tests/global-helpers";
import { AppRoute, Breakpoint } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { getFileIdByName } from "../helpers/cms-integration-helpers";
import { TEST_MOCK_HERO } from "../mocks";

const HOME_PAGE_API_ENDPOINT = `${getStrapiURL()}/home`;

test.describe(`Home page CMS integration tests`, () => {
  test.beforeEach(async () => {
    await updateTestHomePage();
  });

  test.afterEach(async () => {
    await cleanupTestHomePage();
  });

  test(
    `
      GIVEN news page without content
      WHEN call method PUT /api/news-page
      AND goto news page
      SHOULD news page content is displayed correctly
      `,
    checkHomePageOnUiTest,
  );
});

async function checkHomePageOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.HOME,
  });

  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP,
  });

  expect(page.getByText(TEST_MOCK_HERO.title), `Home page hero title should be visible`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HERO.infoCard.title), `Home page hero info card title should be visible`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HERO.scheduleCard.title), `Home page hero schedule card title should be visible`)
    .toBeVisible();
}

async function updateTestHomePage() {
  try {
    const response = await axios.put(HOME_PAGE_API_ENDPOINT, {
      data: {
        blocks: [
          {
            ...TEST_MOCK_HERO,
            image: await getFileIdByName(),
          },
        ],
      },
    });

    await expect(response.status, `Home page should be updating with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test home page: ${(error as AxiosError).message}`);
  }
}

async function cleanupTestHomePage() {
  try {
    const response = await axios.delete(`${HOME_PAGE_API_ENDPOINT}`);

    await expect(response.status, `Home page should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test home page: ${(error as AxiosError).message}`);
  }
}
