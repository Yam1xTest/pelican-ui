import { AppRoute } from '@/src/common/enum';
import { gotoPage } from '@/playwright-tests/helpers';
import { test, Page, expect } from '@playwright/test';

test.describe(`ARIA Attributes`, () => {
  test(`HomePageTest`, HomepageTest);
  test(`DocumentsPageTest`, DocumentsPageTest);
});

async function HomepageTest({
  page,
}: {
  page: Page,
}) {

  await gotoPage({
    page,
    url: AppRoute.HOME,
  });
  
  await expect(page.getByTestId(`header-popup-button`))
    .toHaveAttribute('aria-label', 'Открыть меню')

    await page.getByTestId(`header-popup-button`)
    .click();

    await expect(page.getByTestId(`header-popup-button`))
    .toHaveAttribute('aria-label', 'Закрыть меню')

    await page.getByTestId(`header-popup-ticket-button`)
    .click();

     await expect(page.getByTestId(`tickets-popup-close-button`))
    .toHaveAttribute('aria-label', 'Закрыть модальное окно с билетами')

     await expect(page.getByTestId(`tickets-popup-close-button`))
    .toHaveAttribute('aria-label', 'Закрыть модальное окно с билетами')

    await expect(page.getByTestId(`social-icon-telegram`).first())
    .toHaveAttribute('aria-label', 'Ссылка на telegram')

    await expect(page.getByTestId(`social-icon-odnoklassniki`).first())
    .toHaveAttribute('aria-label', 'Ссылка на odnoklassniki')

    await expect(page.getByTestId(`social-icon-dzen`).first())
    .toHaveAttribute('aria-label', 'Ссылка на dzen')
}


async function DocumentsPageTest({
  page,
}: {
  page: Page,
}) {

  await gotoPage({
    page,
    url: `${AppRoute.DOCUMENTS}/1?year=2025`,
  });

  await expect(page.getByTestId(`tab`).first())
    .toHaveAttribute('aria-label', 'Отобразить документы за 2025 год')

  await expect(page.getByTestId(`document-file-link`).first())
    .toHaveAttribute('aria-label', 'Открыть файл с документом Протокол закупки №31907985526 в новой вкладке')
}

