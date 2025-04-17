import { gotoPage, setViewportSize } from "@/playwright-tests/global-helpers";
import { AppRoute, Breakpoint } from "@/src/common/enum";
import test, { expect, Page } from "@playwright/test";
import { TEST_MOCK_HERO } from "../cms-integration-mocks";
import { updateTestHomePage } from "../helpers/home-page-helpers";

test.describe(`Home page CMS integration tests`, () => {
  test.beforeEach(async () => {
    await updateTestHomePage();
  });

  test(
    `
      GIVEN home page without content
      WHEN call method PUT /api/home
      AND go to home page
      SHOULD display home page content correctly
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
