import { gotoPage } from "@/playwright-tests/global-helpers";
import { AppRoute } from "@/src/common/enum";
import test, { expect, Page } from "@playwright/test";
import { E2E_DRAFT_UI_NAME_PREFIX, enableDraftPreviewMode } from "../helpers/cms-integration-helpers";
import { cleanupTestNewsByTitle, createTestNews, updateTestNewsPage } from "../helpers/news-page-helpers";

const NEWS_PAGE_TITLE = `${E2E_DRAFT_UI_NAME_PREFIX} Новости`;
const NEWS_TITLE = `${E2E_DRAFT_UI_NAME_PREFIX} В зоопарке появился амурский тигр`;
const NEWS_DESCRIPTION = `${E2E_DRAFT_UI_NAME_PREFIX} На фотографии изображен амурский тигр!`;
const NEWS_INNER_CONTENT = `${E2E_DRAFT_UI_NAME_PREFIX} В зоопарке появился амурский тигр, приходите посмотреть!`;

test.describe.skip(`News page draft preview tests`, () => {
  test.beforeEach(async ({
    page,
  }) => {
    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });

    await createTestNews({
      title: NEWS_TITLE,
      description: NEWS_DESCRIPTION,
      innerContent: NEWS_INNER_CONTENT,
      isDraft: true,
    });

    await updateTestNewsPage({
      title: NEWS_PAGE_TITLE,
      isDraft: true,
    });

    await enableDraftPreviewMode({
      page,
    });
  });

  test.afterEach(async () => {
    await cleanupTestNewsByTitle({
      title: NEWS_TITLE,
    });
  });

  test(
    `
      GIVEN news page without content
      WHEN call method PUT /api/news-page?status=draft
      AND call method POST /api/news?status=draft
      AND go to news page
      SHOULD display news page content correctly
      AND display news correctly in draft preview
      `,
    checkNewsPageDraftPreviewOnUiTest,
  );
});

async function checkNewsPageDraftPreviewOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.NEWS,
  });

  expect(page.getByText(NEWS_PAGE_TITLE), `News page title should be visible`)
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
