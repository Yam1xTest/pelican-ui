import { Breakpoint } from "@/src/common/enum";
import { Page } from "@playwright/test";

export async function gotoPage({
  page,
  url,
  useNetworkidle = true,
}: {
  page: Page,
  url: string
  useNetworkidle?: boolean
}) {
  // Allows you to accurately wait for content on the site to load.
  /* Do not use networkidle it for sections where requests take a long time,
     otherwise the test may fail due to a timeout.
  */
  // networkidle - https://playwright.dev/docs/api/class-frame#frame-goto
  await page.goto(url, {
    ...(
      useNetworkidle && {
        waitUntil: `networkidle`,
      }),
  });
}

export async function setViewportSize({
  page,
  width = Breakpoint.MOBILE,
  height = 768,
}: {
  page: Page,
  width?: number,
  height?: number,
}) {
  await page.setViewportSize({
    width,
    height,
  });
}

export async function hideHeader({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`header`)
    .evaluate((element) => element.style.visibility = `hidden`);
}

export async function hideSkipLink({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`skip-link`)
    .evaluate((element) => element.style.visibility = `hidden`);
}

export async function hideFooter({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`footer`)
    .evaluate((element) => element.style.visibility = `hidden`);
}

export async function hideTickets({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`tickets`)
    .evaluate((element) => element.style.visibility = `hidden`);
}

export async function hideMap({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`map`)
    .evaluate((element) => element.style.visibility = `hidden`);
}

export async function hideTextAndMedia({
  page,
}: {
  page: Page,
}) {
  await page.getByTestId(`text-and-media`)
    .evaluate((element) => element.style.visibility = `hidden`);
}
