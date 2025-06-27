import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '@/playwright-tests/custom-test';
import {
  AppRoute,
  Breakpoint,
  BreakpointName,
  ComponentName,
} from '@/src/common/enum';

const TEST_ID = `news-list`;

test.describe(`NewsListComponentTest`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.NEWS_LIST);
  });

  test(`PaginationTest`, paginationTest);

  test(`MobileTest`, mobileTest);

  test(`TabletTest`, tabletTest);

  test(`TabletXlTest`, tabletXlTest);

  test(`DesktopTest`, desktopTest);

  test(`DesktopXlTest`, desktopXlTest);
});

async function paginationTest({
  page,
  setViewportSize,
  goto,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
  goto: CustomTestFixtures['goto'];
}) {
  // We are not testing pagination on a component page because there is no pagination logic on it.
  await goto(AppRoute.NEWS);

  await setViewportSize();

  await expect(getNewsCardByTestId({
    page,
  }))
    .toHaveCount(6);

  await page.getByTestId(`news-list-button`)
    .click();

  await expect(getNewsCardByTestId({
    page,
  }))
    .toHaveCount(7);
}

async function mobileTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    height: 2434,
  });

  await expect(getNewsListByTestId({
    page,
  }))
    .toHaveScreenshot(`${TEST_ID}-${BreakpointName.MOBILE}.png`);
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
    height: 1319,
  });

  await expect(getNewsListByTestId({
    page,
  }))
    .toHaveScreenshot(`${TEST_ID}-${BreakpointName.TABLET}.png`);
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
    height: 1760,
  });

  await expect(getNewsListByTestId({
    page,
  }))
    .toHaveScreenshot(`${TEST_ID}-${BreakpointName.TABLET_XL}.png`);
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
    height: 1314,
  });

  await expect(getNewsListByTestId({
    page,
  }))
    .toHaveScreenshot(`${TEST_ID}-${BreakpointName.DESKTOP}.png`);
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
    height: 1695,
  });

  await expect(getNewsListByTestId({
    page,
  }))
    .toHaveScreenshot(`${TEST_ID}-${BreakpointName.DESKTOP_XL}.png`);
}

function getNewsListByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(TEST_ID);
}

function getNewsCardByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(`cards-card`);
}
