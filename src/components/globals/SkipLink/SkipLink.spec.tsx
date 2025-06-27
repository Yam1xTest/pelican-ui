import {
    CustomTestFixtures,
    expect,
    Page,
    test,
} from '@/playwright-tests/custom-test';
import { ComponentName } from '@/src/common/enum';

test.describe(`SkipLinkTest`, () => {
  test.beforeEach(async ({
    goToComponentsPage: gotoComponentsPage,
  }) => {
    await gotoComponentsPage(ComponentName.SKIP_LINK);
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

  await page.getByTestId(`skip-link`)
    .click();

  await expect(
    page.getByTestId(`main-content`),
  )
    .toBeFocused;
}
