import { test as base } from '@playwright/test';
import fs from 'fs';
import { Breakpoint } from '@/src/common/enum';

export type CustomTestFixtures = {
  goto: (options?: { path?: string; hideSkipLink?: boolean; }) => void;
  apiImageMock: () => void;
  hideCookie: () => void;
  hideHeader: () => void;
  hideFooter: () => void;
  hideMap: () => void;
  setViewportSize: (options?: { width?: number; height?: number; }) => void;
};

// https://playwright.dev/docs/test-fixtures
// Extend base playwright test
export const test = base.extend<CustomTestFixtures>({
  goto: async ({
    page,
    apiImageMock,
  }, use) => {
    const goto = async ({
      path = ``,
      hideSkipLink = true,
    }: {
      path?: string;
      hideSkipLink?: boolean;
    } = {}) => {
      await apiImageMock();

      await page.goto(path, {
        waitUntil: `networkidle`,
      });

      if (hideSkipLink) {
        const skipLink = page.getByTestId(`skip-link`);
        if (await skipLink.isVisible()) {
          await skipLink.evaluate((element) => element.style.visibility = `hidden`);
        }
      }
    };

    // Use the fixture value in the test
    await use(goto);
  },

  setViewportSize: async ({
    page,
  }, use) => {
    const setViewportSize = async ({
      width = Breakpoint.MOBILE,
      height = 768,
    }: {
      width?: number;
      height?: number;
    } = {}) => {
      await page.setViewportSize({
        width,
        height,
      });
    };

    await use(setViewportSize);
  },

  apiImageMock: async ({
    page,
  }, use) => {
    const PNG_STUB_FILE = fs.readFileSync(`./playwright-tests/fixtures/stub.png`);

    const apiImageMock = async () => {
      await page.route(`**/_next/image*`, async (route, request) => {
        // Make sure that the browser is waiting for an image
        const accept = await request.headerValue(`accept`);
        const acceptsPng = accept?.includes(`image/*`);

        if (!acceptsPng) return route.continue();

        return route.fulfill({
          contentType: `image/png`,
          body: PNG_STUB_FILE,
        });
      });
    };

    await use(apiImageMock);
  },

  hideCookie: async ({
    page,
  }, use) => {
    const hideCookie = async () => {
      await page.getByTestId(`cookie`)
        .evaluate((element) => element.style.visibility = `hidden`);
    };

    await use(hideCookie);
  },

  hideHeader: async ({
    page,
  }, use) => {
    const hideHeader = async () => {
      await page.getByTestId(`header`)
        .evaluate((element) => element.style.visibility = `hidden`);
    };

    await use(hideHeader);
  },

  hideFooter: async ({
    page,
  }, use) => {
    const hideFooter = async () => {
      await page.getByTestId(`footer`)
        .evaluate((element) => element.style.visibility = `hidden`);
    };

    await use(hideFooter);
  },

  hideMap: async ({
    page,
  }, use) => {
    const hideMap = async () => {
      await page.getByTestId(`map`)
        .evaluate((element) => element.style.visibility = `hidden`);
    };

    await use(hideMap);
  },

});

export {
  expect,
  type Page,
} from '@playwright/test';
