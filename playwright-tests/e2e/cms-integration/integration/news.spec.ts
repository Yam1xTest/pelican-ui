import { E2E_UI_NAME_PREFIX, getFileIdByName, gotoPage } from "@/playwright-tests/helpers";
import { NewsCollectionListResponse } from "@/src/common/api-types";
import { AppRoute } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";

const NEWS_TITLE = `${E2E_UI_NAME_PREFIX} В зоопарке появился амурский тигр`;
const DESCRIPTION = `На фотографии изображен амурский тигр!`;
const INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const ENDPOINT = `/news`;

test.describe(`News CMS integration tests`, () => {
  test.beforeEach(async () => {
    await deleteNewsByTitle({
      title: NEWS_TITLE,
    });

    await createNews();
  });

  test.afterEach(async () => {
    await deleteNewsByTitle({
      title: NEWS_TITLE,
    });
  });

  test(
    `
      GIVEN news page without news
      WHEN call method POST ${ENDPOINT}
      AND goto news page
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

  expect(page.getByText(NEWS_TITLE))
    .toBeVisible();

  expect(page.getByText(DESCRIPTION))
    .toBeVisible();

  await page.getByText(NEWS_TITLE)
    .click();

  await page.waitForURL(`${AppRoute.NEWS}/**`);

  expect(page.getByText(INNER_CONTENT))
    .toBeVisible();
}

async function createNews() {
  const response = await axios.post(`${getStrapiURL()}${ENDPOINT}`, {
    data: {
      title: NEWS_TITLE,
      description: DESCRIPTION,
      image: await getFileIdByName(),
      innerContent: INNER_CONTENT,
    },
  });

  await expect(response.status, `News creating`)
    .toEqual(HttpStatusCode.Created);
}

async function deleteNewsByTitle({
  title,
}: {
  title: string;
}) {
  const newsResponse = (await axios.get(`${getStrapiURL()}${ENDPOINT}?populate=*`)).data;

  const news = getNewsByTitle({
    news: newsResponse,
    title,
  });

  if (news) {
    const response = await axios.delete(`${getStrapiURL()}${ENDPOINT}/${news.documentId}`);

    await expect(response.status, `News deletion`)
      .toEqual(HttpStatusCode.NoContent);
  }
}

function getNewsByTitle({
  news,
  title,
}: {
  news: NewsCollectionListResponse;
  title: string;
}) {
  return news?.data?.find((item) => item.title === title);
}
