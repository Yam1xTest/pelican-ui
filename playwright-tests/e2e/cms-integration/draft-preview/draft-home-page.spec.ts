import { setViewportSize } from "@/playwright-tests/global-helpers";
import { AppRoute, Breakpoint } from "@/src/common/enum";
import test, { expect, Page } from "@playwright/test";
import { TEST_MOCK_HERO } from "../cms-integration-mocks";
import { updateTestHomePage } from "../helpers/home-page-helpers";
import { goToWithDraftPreviewMode } from "../helpers/cms-integration-helpers";

test.describe(`Home page draft preview tests`, () => {
  test.beforeEach(async ({
    page,
  }) => {
    await updateTestHomePage({
      isDraft: true,
    });
  });

  test(
    `
      GIVEN home page without content
      WHEN call method PUT /api/home?status=draft
      AND go to home page
      SHOULD display home page content correctly in draft preview
      `,
    checkHomePageDraftPreviewOnUiTest,
  );
});

async function checkHomePageDraftPreviewOnUiTest({
  page,
}: {
  page: Page;
}) {
  await goToWithDraftPreviewMode({
    page,
    slug: AppRoute.HOME.slice(1),
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
