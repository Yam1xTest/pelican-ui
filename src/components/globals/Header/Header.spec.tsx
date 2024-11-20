import { Breakpoint } from '@/src/common/enum';
import { setViewportSize } from '@/test/helpers';
import { test, expect } from '@playwright/experimental-ct-react';
import {
  EMAIL,
  NAVIGATION_LINKS,
  PHONE,
  POPUP_TICKET_BUY_TEXT,
} from '@/src/common/mocks/globals-mock';
import { Page } from 'playwright';
import { Header } from './Header';

test.describe(`HeaderComponentTests`, () => {
  test.beforeEach(async ({
    mount,
  }) => {
    await mount(
      <Header
        navigationLinks={NAVIGATION_LINKS}
        email={EMAIL}
        phone={PHONE}
        popupTicketBuyText={POPUP_TICKET_BUY_TEXT}
        overlayElementRef={null as any}
      />,
    );
  });

  test(`MobileTest`, mobileTest);

  test(`TabletTest`, tabletTest);

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
  });

  await expect(getHeaderByTestId({
    page,
  }))
    .toHaveScreenshot(`header-mobile.png`);
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

  await expect(getHeaderByTestId({
    page,
  }))
    .toHaveScreenshot(`header-tablet.png`);
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

  await expect(getHeaderByTestId({
    page,
  }))
    .toHaveScreenshot(`header-desktop.png`);
}

async function desktopXlTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP_XL,
  });

  await expect(getHeaderByTestId({
    page,
  }))
    .toHaveScreenshot(`header-desktop-xl.png`);
}

function getHeaderByTestId({
  page,
}: {
  page: Page
}) {
  return page.getByTestId(`header`);
}
