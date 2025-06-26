/* eslint-disable no-await-in-loop */
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '@/playwright-tests/custom-test';
import {
  Breakpoint,
  BreakpointName,
  ComponentName
} from '@/src/common/enum';

test.describe(`CategoriesListComponentTests`, () => {
  test.beforeEach(async ({
    gotoComponentsPage,
  }) => {
    await gotoComponentsPage({
      path: ComponentName.CATEGORIES,
    });
  });

  test(`MobileTest`, mobileTest);

  test(`TabletTest`, tabletTest);

  test(`TabletXlTest`, tabletXlTest);

  test(`DesktopTest`, desktopTest);

  test(`DesktopXlTest`, desktopXlTest);
});

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
