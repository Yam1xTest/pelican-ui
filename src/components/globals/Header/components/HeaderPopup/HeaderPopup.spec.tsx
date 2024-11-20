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
import { HeaderPopup } from './HeaderPopup';

test.describe(`HeaderPopupTests`, () => {
  test.beforeEach(async ({
    mount,
  }) => {
    await mount(
      <HeaderPopup
        email={EMAIL}
        phone={PHONE}
        navigationLinks={NAVIGATION_LINKS}
        popupTicketBuyText={POPUP_TICKET_BUY_TEXT}
        isActive
      />,
    );
  });

  test(`MobilePopupTest`, mobilePopupTest);

  test(`TabletPopupTest`, tabletPopupTest);

  test(`TabletXlPopupTest`, tabletXlPopupTest);
});

async function mobilePopupTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
  });

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-mobile-popup.png`);
}

async function tabletPopupTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET,
  });

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-tablet-popup.png`);
}

async function tabletXlPopupTest({
  page,
}: {
  page: Page,
}) {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET_XL,
  });

  await expect(getHeaderPopupByTestId({
    page,
  }))
    .toHaveScreenshot(`header-tablet-xl-popup.png`);
}

function getHeaderPopupByTestId({
  page,
}: {
  page: Page
}) {
  return page.getByTestId(`header-popup`);
}
