import { AppRoute, BlockTypes } from '@/src/common/enum';
import {
  gotoPage,
  hideHeader,
  hideSkipLink,
  setViewportSize,
} from '@/playwright-tests/helpers';
import { test, expect, Page } from '@playwright/test';

test.describe(`ImageWithButtonGridTests`, () => {
  test.beforeEach(async ({
    page,
  }) => {
    await gotoPage({
      page,
      url: `${AppRoute.INTERNAL_TEST_PAGE}/${BlockTypes.IMAGE_WITH_BUTTON_GRID}`,
    });

    await hideHeader({
      page,
    });

    await hideSkipLink({
      page,
    });
  });

  test(`MobileTest`, mobileTest);
});

async function mobileTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
  });

  await expect(getImageWithButtonGridByTestId({
    page,
  }))
    .toHaveScreenshot(`image-with-button-grid-mobile.png`);
}

function getImageWithButtonGridByTestId({
  page,
}: {
  page: Page
}) {
  return page.getByTestId(`image-with-button-grid`);
}
