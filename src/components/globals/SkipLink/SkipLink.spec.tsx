import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from '@/playwright-tests/custom-test';
import { AppRoute } from '@/src/common/enum';

test.describe(`SkipLinkTest`, () => {
  test.beforeEach(async ({
    goto,
  }) => {
    await goto({
      path: AppRoute.INTERNAL_TEST_PAGE,
      hideSkipLink: false,
    });
  });

  test(`MobileTest`, mobileTest);
});

async function mobileTest({
  page,
  setViewportSize,
}: {
  page: Page;
  setViewportSize: CustomTestFixtures['setViewportSize'];
}) {
  await setViewportSize();

  await page.keyboard.press(`Tab`);

  await page.getByTestId(`skip-link`)
    .click();

  await expect(
    page.getByTestId(`main-content`),
  )
    .toBeFocused;
}
