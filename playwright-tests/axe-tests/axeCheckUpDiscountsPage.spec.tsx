/* eslint-disable no-console */
import { test } from '@playwright/test';
import { AppRoute, Breakpoint } from '@/src/common/enum';
import { axeCheckAndWriteReport, setViewportSize } from '../helpers';

test(`axeCheckUp Discounts Page Desktop`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP,
  });

  await page.goto(`${AppRoute.DISCOUNTS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `desktop`,
    pageName: `discounts`,
  });
});

test(`axeCheckUp Discounts Page Tablet`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET,
  });

  await page.goto(`${AppRoute.DISCOUNTS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `tablet`,
    pageName: `discounts`,
  });
});

test(`axeCheckUp Discounts Page Mobile`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.MOBILE,
  });

  await page.goto(`${AppRoute.DISCOUNTS}`);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `mobile`,
    pageName: `discounts`,
  });
});
