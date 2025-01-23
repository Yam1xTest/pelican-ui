import { Breakpoint } from "@/src/common/enum";
import { Page } from "@playwright/test";

export async function gotoPage({
  page,
  url,
}: {
  page: Page,
  url: string
}) {
  await page.goto(url, {
    waitUntil: `networkidle`,
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
const globalBlocks = [`header`, `footer`];
const blocks = [
  `hero`,
  `text-and-media`,
  `services`,
  `contact-zoo`,
  `tickets`,
  `map`,
];

export async function hideAllHomeBlocksExceptTheTestedOne({
  page,
  testedBlock,
}: {
  page: Page,
  testedBlock: string,
}) {
  [...globalBlocks, ...blocks].forEach(async (block) => {
    if (block !== testedBlock) {
      await page.getByTestId(block)
        .evaluate((element) => element.style.display = `none`);
    }
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
