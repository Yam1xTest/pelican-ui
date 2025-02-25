/* eslint-disable no-console */
import { test } from '@playwright/test';
import { AppRoute, Breakpoint } from '@/src/common/enum';
import { axeCheckAndWriteReport, setViewportSize } from '../helpers';

test(`axeCheckUp Document Page Desktop XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP_XL,
  });

  await page.goto(`${AppRoute.DOCUMENTS}/1?year=2025`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `desktop-xl`,
  });
});

test(`axeCheckUp Document Page Tablet XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET_XL,
  });

  await page.goto(`${AppRoute.DOCUMENTS}/1?year=2025`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `tablet-xl`,
  });
});

test(`axeCheckUp Document Page Mobile`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.MOBILE,
  });

  await page.goto(`${AppRoute.DOCUMENTS}/1?year=2025`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `mobile`,
  });
});
