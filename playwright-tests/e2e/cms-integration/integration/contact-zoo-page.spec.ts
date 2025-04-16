import { gotoPage, setViewportSize } from "@/playwright-tests/global-helpers";
import { AppRoute, Breakpoint } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { getFileIdByName } from "../helpers/cms-integration-helpers";
import { TEST_MOCK_HERO } from "../mocks";

const CONTACT_ZOO_PAGE_API_ENDPOINT = `${getStrapiURL()}/contact-zoo`;

test.describe(`Contact zoo page CMS integration tests`, () => {
  test.beforeEach(async () => {
    await updateTestContactZooPage();
  });

  test.afterEach(async () => {
    await cleanupTestContactZooPage();
  });

  test(
    `
      GIVEN contact zoo page without content
      WHEN call method PUT /api/contact-zoo
      AND go to contact zoo page
      SHOULD contact zoo page content is displayed correctly
      `,
    checkContactZooPageOnUiTest,
  );
});

async function checkContactZooPageOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.CONTACT_ZOO,
  });

  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP,
  });

  expect(page.getByText(TEST_MOCK_HERO.title), `Contact zoo page hero title should be visible`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HERO.infoCard.title), `Contact zoo page hero info card title should be visible`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HERO.scheduleCard.title), `Contact zoo page hero schedule card title should be visible`)
    .toBeVisible();
}

async function updateTestContactZooPage() {
  try {
    const response = await axios.put(CONTACT_ZOO_PAGE_API_ENDPOINT, {
      data: {
        blocks: [
          {
            ...TEST_MOCK_HERO,
            image: await getFileIdByName(),
          },
        ],
      },
    });

    await expect(response.status, `Contact zoo page should be updating with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test contact zoo page: ${(error as AxiosError).message}`);
  }
}

async function cleanupTestContactZooPage() {
  try {
    const response = await axios.delete(`${CONTACT_ZOO_PAGE_API_ENDPOINT}`);

    await expect(response.status, `Contact zoo page should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test home page: ${(error as AxiosError).message}`);
  }
}
