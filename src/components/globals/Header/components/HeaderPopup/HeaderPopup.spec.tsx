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

test.describe(`HeaderPopupTests`, () => {
  test.beforeEach(async ({
    goToComponentsPage: gotoComponentsPage,
  }) => {
    await gotoComponentsPage(ComponentName.HEADER_POPUP);
  });

  test(`ActionTest`, actionTest);

  test(`NavigationTest`, navigationTest);

  test(`MobilePopupTest`, mobilePopupTest);

  test(`TabletPopupTest`, tabletPopupTest);

  test(`TabletXlPopupTest`, tabletXlPopupTest);
});

async function actionTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize();

  await expect(page.getByTestId(`header-popup`))
    .toContainText(`Льготы`);
}

async function navigationTest({
  page,
  goto,
}: {
  page: Page;
  goto: CustomTestFixtures['goto'];
}) {
  await goto(AppRoute.NEWS);

  await page.locator(`.header-logo`)
    .click();

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toBeHidden();

  await expect(page)
    .toHaveURL(AppRoute.HOME);
}

async function mobilePopupTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize();

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-popup-${BreakpointName.MOBILE}.png`);
}

async function tabletPopupTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.TABLET,
  });

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-popup-${BreakpointName.TABLET}.png`);
}

async function tabletXlPopupTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize({
    width: Breakpoint.TABLET_XL,
  });

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-popup-${BreakpointName.TABLET_XL}.png`);
}

function getHeaderPopupByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(`header-popup`);
}
