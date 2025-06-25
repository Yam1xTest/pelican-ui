/* eslint-disable no-await-in-loop */
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '@/playwright-tests/custom-test';
import {
  AppRoute,
  BlockTypes,
  Breakpoint,
  BreakpointName,
} from '@/src/common/enum';
import { MOCK_DOCUMENTS_CATEGORIES } from '@/src/common/mocks/collections-mock/documents-categories-collection-mock';

test.describe(`CategoriesListComponentTests`, () => {
  test.beforeEach(async ({
    goto,
    hideHeader,
    hideCookie,
  }) => {
    await goto(`${AppRoute.INTERNAL_TEST_PAGE}/${BlockTypes.SHARED_CATEGORIES}`);

    await hideHeader();

    await hideCookie();
  });

  test(`RouteTest`, routeTest);

  test(`MobileTest`, mobileTest);

  test(`TabletTest`, tabletTest);

  test(`TabletXlTest`, tabletXlTest);

  test(`DesktopTest`, desktopTest);

  test(`DesktopXlTest`, desktopXlTest);
});

async function routeTest({
  page,
  goto,
  setViewportSize,
}: {
  page: Page;
  goto: CustomTestFixtures['goto'];
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize();

  await page.getByTestId(`category`)
    .nth(0)
    .click();

  await page.waitForURL(`**${AppRoute.DOCUMENTS}/${MOCK_DOCUMENTS_CATEGORIES[0].slug}`);

  expect(page.url())
    .toBe(`http://localhost:3000${AppRoute.DOCUMENTS}/${MOCK_DOCUMENTS_CATEGORIES[0].slug}`);

  await page.goBack();

  await goto(`${AppRoute.DOCUMENTS}/100`);

  await page.getByTestId(`not-found`);
}

async function mobileTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize();

  await expect(getDocumentsCategoriesListByTestId({
    page,
  }))
    .toHaveScreenshot(`documents-categories-${BreakpointName.MOBILE}.png`);
}

async function tabletTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.TABLET,
  });

  await expect(getDocumentsCategoriesListByTestId({
    page,
  }))
    .toHaveScreenshot(`documents-categories-${BreakpointName.TABLET}.png`);
}

async function tabletXlTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.TABLET_XL,
  });

  await expect(getDocumentsCategoriesListByTestId({
    page,
  }))
    .toHaveScreenshot(`documents-categories-${BreakpointName.TABLET_XL}.png`);
}

async function desktopTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.DESKTOP,
  });

  await expect(getDocumentsCategoriesListByTestId({
    page,
  }))
    .toHaveScreenshot(`documents-categories-${BreakpointName.DESKTOP}.png`);
}

async function desktopXlTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.DESKTOP_XL,
  });

  await expect(getDocumentsCategoriesListByTestId({
    page,
  }))
    .toHaveScreenshot(`documents-categories-${BreakpointName.DESKTOP_XL}.png`);
}

function getDocumentsCategoriesListByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(`categories`);
}
