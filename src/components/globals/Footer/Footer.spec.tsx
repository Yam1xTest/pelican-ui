import { BREAKPOINTS } from '@/playwright-tests/constants/breakpoints';
import { test } from '@/playwright-tests/custom-test';
import { ComponentName } from '@/src/common/enum';

test.describe(`FooterTests`, () => {
  test.beforeEach(async ({
    page,
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.FOOTER);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: `footer`,
        breakpoint,
        breakpointName,
      });
    });
  }
});
