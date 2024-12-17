import { AppRoute } from '@/src/common/enum';
import { gotoPage, setViewportSize } from '@/playwright-tests/helpers';
import { test, expect, Page } from '@playwright/test';

test.describe(`TabTests`, () => {
  test.beforeEach(async ({
    page,
  }) => {
    await gotoPage({
      page,
      url: AppRoute.HOME,
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

  await page.getByTestId(`text-and-media`)
    .evaluate((element) => element.style.visibility = `hidden`);

  const expectedTabOrder = [
    `header-logo`,
    `header-popup-button`,
    `hero-tickets-contact-button`,
    `hero-tickets-popup-button`,
    `services-phone-link`,
    `services-email-link`,
    `contact-zoo-btn`,
    `ticket-card-link`,
    `ticket-card-link`,
    `ticket-card-link`,
    `tickets-buy-button`,
    `tickets-all-discounts`,
    `map-address-link`,
    `footer-tickets-popup-button`,
    `footer-nav-link`,
    `footer-nav-link`,
    `footer-nav-link`,
    `footer-nav-link`,
    `footer-nav-link`,
    `footer-tel-link`,
    `footer-email-link`,
    `social-icon-vkontakte`,
    `social-icon-telegram`,
    `social-icon-odnoklassniki`,
    `social-icon-dzen`,
    `footer-copyright-link`,
    `footer-official-link`,
    `footer-official-link`,
    `footer-official-link`,
  ];

  for (const element of expectedTabOrder) {
    await page.keyboard.press(`Tab`);
    await page.waitForTimeout(500);
    await expect(page.locator(`:focus`))
      .toHaveAttribute(`data-testid`, `${element}`);
  }
}
