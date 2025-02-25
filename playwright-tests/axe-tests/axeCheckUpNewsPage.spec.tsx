/* eslint-disable no-console */
import { test } from '@playwright/test';
import { AppRoute, Breakpoint } from '@/src/common/enum';
import { axeCheckAndWriteReport, setViewportSize } from '../helpers';

test(`axeCheckUp News Page Desktop XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP_XL,
  });

  await page.goto(`${AppRoute.NEWS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `desktop-xl`,
  });
});

test(`axeCheckUp News Page Tablet XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET_XL,
  });

  await page.goto(`${AppRoute.NEWS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `tablet-xl`,
  });
});

test(`axeCheckUp News Page Mobile`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.MOBILE,
  });

  await page.goto(`${AppRoute.NEWS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `mobile`,
  });
});
