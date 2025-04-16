import { gotoPage } from "@/playwright-tests/global-helpers";
import { AppRoute } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { NewsCollection } from "@/src/common/api-types";
import { E2E_UI_NAME_PREFIX, getFileIdByName } from "../helpers/cms-integration-helpers";

const NEWS_PAGE_TITLE = `${E2E_UI_NAME_PREFIX} Новости`;
const NEWS_TITLE = `${E2E_UI_NAME_PREFIX} В зоопарке появился амурский тигр`;
const NEWS_DESCRIPTION = `На фотографии изображен амурский тигр!`;
const NEWS_INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const NEWS_API_ENDPOINT = `${getStrapiURL()}/news`;
const NEWS_PAGE_API_ENDPOINT = `${getStrapiURL()}/news-page`;

test.describe(`News page CMS integration tests`, () => {
  test.beforeEach(async () => {
    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });

    await createTestNews();

    await updateTestNewsPage();
  });

  test.afterEach(async () => {
    await cleanupTestNewsPage();

    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });
  });

  test(
    `
      GIVEN news page without content
      WHEN call method PUT /api/news-page
      AND call method POST /api/news
      AND go to news page
      SHOULD display news page content correctly
      AND display news correctly
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

  expect(page.getByText(NEWS_TITLE), `News title should be visible`)
    .toBeVisible();

  expect(page.getByText(NEWS_DESCRIPTION), `News description should be visible`)
    .toBeVisible();

  await page.getByText(NEWS_TITLE)
    .click();

  await page.waitForURL(`${AppRoute.NEWS}/**`);

  expect(page.getByText(NEWS_INNER_CONTENT), `News content should be visible`)
    .toBeVisible();
}

async function updateTestNewsPage() {
  try {
    const response = await axios.put(NEWS_PAGE_API_ENDPOINT, {
      data: {
        title: NEWS_PAGE_TITLE,
      },
    });

    await expect(response.status, `News page should be updated with status 200`)
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

async function createTestNews() {
  try {
    const response = await axios.post(NEWS_API_ENDPOINT, {
      data: {
        title: NEWS_TITLE,
        description: NEWS_DESCRIPTION,
        image: await getFileIdByName(),
        innerContent: NEWS_INNER_CONTENT,
      },
    });

    await expect(response.status, `News should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to create test news: ${(error as AxiosError).message}`);
  }
}

async function cleanupTestNewsByTitle({
  title,
}: {
  title: string;
}) {
  try {
    const newsResponse = (await axios.get(`${NEWS_API_ENDPOINT}?populate=*`)).data;

    const testNews = newsResponse.data.find((item: NewsCollection) => item.title === title);

    if (testNews) {
      const response = await axios.delete(`${NEWS_API_ENDPOINT}/${testNews.documentId}`);

      await expect(response.status, `News should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test news: ${(error as AxiosError).message}`);
  }
}
