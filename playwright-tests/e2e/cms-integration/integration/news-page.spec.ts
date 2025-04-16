import { gotoPage } from "@/playwright-tests/global-helpers";
import { AppRoute } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { E2E_UI_NAME_PREFIX } from "../helpers/cms-integration-helpers";

const NEWS_TITLE = `${E2E_UI_NAME_PREFIX} Новости`;
const NEWS_PAGE_API_ENDPOINT = `${getStrapiURL()}/news-page`;

test.describe(`News page CMS integration tests`, () => {
  test.beforeEach(async () => {
    await updateTestNewsPage();
  });

  test.afterEach(async () => {
    await cleanupTestNewsPage();
  });

  test(
    `
      GIVEN news page without content
      WHEN call method PUT /api/news-page
      AND goto news page
      SHOULD news page content is displayed correctly
      `,
    checkNewsPageOnUiTest,
  );
});

async function checkNewsPageOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.NEWS,
  });

  expect(page.getByText(NEWS_TITLE), `News page title should be visible`)
    .toBeVisible();
}

async function updateTestNewsPage() {
  try {
    const response = await axios.put(NEWS_PAGE_API_ENDPOINT, {
      data: {
        title: NEWS_TITLE,
      },
    });

    await expect(response.status, `News page should be updating with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test news page: ${(error as AxiosError).message}`);
  }
}

async function cleanupTestNewsPage() {
  try {
    const response = await axios.delete(`${NEWS_PAGE_API_ENDPOINT}`);

    await expect(response.status, `News page should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test news page: ${(error as AxiosError).message}`);
  }
}
