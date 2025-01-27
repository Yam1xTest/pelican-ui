import { AppRoute, Breakpoint } from '@/src/common/enum';
import { gotoPage, hideHeader, setViewportSize } from '@/playwright-tests/helpers';
import { test, expect, Page } from '@playwright/test';

test.describe(`ContactZooHeroComponentTests`, () => {
  test.beforeEach(async ({
    page,
  }) => {
    await gotoPage({
      page,
      url: AppRoute.CONTACT_ZOO,
    });

    await hideHeader({
      page,
    });

    await expect(page.getByTestId(`hero-image`))
      .not
      .toHaveJSProperty(`naturalWidth`, 0);
  });

  test(`MobileTest`, mobileTest);

  test(`TabletTest`, tabletTest);

  test(`TabletXlTest`, tabletXlTest);

  test(`DesktopTest`, desktopTest);

  test(`DesktopXlTest`, desktopXlTest);
});

async function mobileTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: 378,
  });

  await expect(getHeroByTestId({
    page,
  }))
    .toHaveScreenshot(`contact-zoo-hero-mobile.png`);
}

async function tabletTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET,
  });

  await expect(getHeroByTestId({
    page,
  }))
    .toHaveScreenshot(`contact-zoo-hero-tablet.png`);
}

async function tabletXlTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET_XL,
  });

  await expect(getHeroByTestId({
    page,
  }))
    .toHaveScreenshot(`contact-zoo-hero-tablet-xl.png`);
}

async function desktopTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP,
  });

  await expect(getHeroByTestId({
    page,
  }))
    .toHaveScreenshot(`contact-zoo-hero-desktop.png`);
}

async function desktopXlTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP_XL,
    height: 955,
  });

  await expect(getHeroByTestId({
    page,
  }))
    .toHaveScreenshot(`contact-zoo-hero-desktop-xl.png`);
}

function getHeroByTestId({
  page,
}: {
  page: Page
}) {
  return page.getByTestId(`hero`);
}
