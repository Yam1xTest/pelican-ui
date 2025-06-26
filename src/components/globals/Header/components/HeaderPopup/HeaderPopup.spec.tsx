import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '@/playwright-tests/custom-test';
import { AppRoute, Breakpoint, BreakpointName } from '@/src/common/enum';

test.describe(`HeaderPopupTests`, () => {
  test.beforeEach(async ({
    goto,
  }) => {
    await goto({
      hideHeader: false,
    });
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

  await getHeaderPopupButtonByTestId({
    page,
  })
    .then((button) => button.click());

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
  await goto({
    path: AppRoute.NEWS,
    hideHeader: false,
  });

  await getHeaderPopupButtonByTestId({
    page,
  })
    .then((button) => button.click());

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

  await getHeaderPopupButtonByTestId({
    page,
  })
    .then((button) => button.click());

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

  await getHeaderPopupButtonByTestId({
    page,
  })
    .then((button) => button.click());

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

  await getHeaderPopupButtonByTestId({
    page,
  })
    .then((button) => button.click());

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-popup-${BreakpointName.TABLET_XL}.png`);
}

async function getHeaderPopupButtonByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(`header-popup-button`);
}

function getHeaderPopupByTestId({
  page,
}: {
  page: Page;
}) {
  return page.getByTestId(`header-popup`);
}
