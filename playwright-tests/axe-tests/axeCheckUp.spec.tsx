/* eslint-disable no-console */
import { Page, test } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { AppRoute, Breakpoint } from '@/src/common/enum';
import { setViewportSize } from '../helpers';

test(`axeCheckUp Desktop XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP_XL,
  });

  await page.goto(AppRoute.HOME);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `desktop-xl`,
  });
});

test(`axeCheckUp Tablet XL`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.TABLET_XL,
  });

  await page.goto(AppRoute.HOME);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `tablet-xl`,
  });
});

test(`axeCheckUp Mobile`, async ({
  page,
}) => {
  await setViewportSize({
    page,
    width: Breakpoint.MOBILE,
  });

  await page.goto(AppRoute.HOME);

  await page.addScriptTag({
    path: require.resolve(`axe-core/axe.min.js`),
  });

  await axeCheckAndWriteReport({
    page,
    viewport: `mobile`,
  });
});

async function axeCheckAndWriteReport({
  page,
  viewport,
}: {
  page: Page,
  viewport: string
}) {
  const windowAnyType = window as any;
  const results = await page.evaluate(() => windowAnyType.axe.run());

  const {
    violations,
  } = results;

  if (violations.length > 0) {
    console.table(violations.map((violation: any) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.length,
    })));
    const filePath = `./playwright-tests/axe-reports/axe-report-${viewport}.json`;

    mkdirSync(dirname(filePath), {
      recursive: true,
    });

    writeFileSync(filePath, JSON.stringify(violations, null, 2));

    throw new Error(`Accessibility violations found: ${violations.length}`);
  } else {
    console.log(`No accessibility violations found.`);
  }
}
