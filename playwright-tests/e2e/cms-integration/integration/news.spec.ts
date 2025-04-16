import { gotoPage } from "@/playwright-tests/global-helpers";
import { NewsCollection } from "@/src/common/api-types";
import { AppRoute } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { E2E_UI_NAME_PREFIX, getFileIdByName } from "../helpers/cms-integration-helpers";

const NEWS_TITLE = `${E2E_UI_NAME_PREFIX} В зоопарке появился амурский тигр`;
const DESCRIPTION = `На фотографии изображен амурский тигр!`;
const INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const NEWS_API_ENDPOINT = `${getStrapiURL()}/news`;

test.describe(`News CMS integration tests`, () => {
  test.beforeEach(async () => {
    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });

    await createTestNews();
  });

  test.afterEach(async () => {
    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });
  });

  test(
    `
      GIVEN news page without news
      WHEN call method POST /api/news
      AND go to news page
      SHOULD news is displayed correctly
      `,
    checkNewsOnUiTest,
  );
});

async function checkNewsOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.NEWS,
  });

  expect(page.getByText(NEWS_TITLE), `News title should be visible`)
    .toBeVisible();

  expect(page.getByText(DESCRIPTION), `News description should be visible`)
    .toBeVisible();

  await page.getByText(NEWS_TITLE)
    .click();

  await page.waitForURL(`${AppRoute.NEWS}/**`);

  expect(page.getByText(INNER_CONTENT), `News content should be visible`)
    .toBeVisible();
}

async function createTestNews() {
  try {
    const response = await axios.post(NEWS_API_ENDPOINT, {
      data: {
        title: NEWS_TITLE,
        description: DESCRIPTION,
        image: await getFileIdByName(),
        innerContent: INNER_CONTENT,
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
