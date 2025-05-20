import test, { expect } from "@playwright/test";

test(`Check security headers`, async ({
  page,
}) => {
  const response = await page.goto(``);

  if (!response) {
    throw new Error(`No response from the server`);
  }

  const headers = await response.allHeaders();
  const nonce = await page.evaluate(() => (window as any).__NONCE__);

  expect(headers[`access-control-allow-credentials`])
    .toBe(`false`);

  expect(headers[`access-control-allow-origin`])
    .toBe(`https://chelzoo.tech`);

  expect(headers[`cross-origin-opener-policy`])
    .toBe(`same-origin`);

  // security headers
  expect(headers[`x-frame-options`])
    .toBe(`SAMEORIGIN`);

  expect(headers[`x-content-type-options`])
    .toBe(`nosniff`);

  expect(headers[`referrer-policy`])
    .toBe(`no-referrer`);

  expect(headers[`permissions-policy`])
    // eslint-disable-next-line @stylistic/max-len
    .toBe(`interest-cohort=(), camera=(), microphone=(), geolocation=(), fullscreen=(), payment=(), usb=(), accelerometer=(), display-capture=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(self), xr-spatial-tracking=()`);

  expect(headers[`content-security-policy`])
    // eslint-disable-next-line @stylistic/max-len
    .toBe(`default-src 'none'; script-src 'self' ${process.env.NODE_ENV === `production` ? `'strict-dynamic' 'nonce-${nonce}'` : `'unsafe-eval'`} https://mc.yandex.ru https://pos.gosuslugi.ru 'unsafe-inline'; style-src 'self' ${process.env.NODE_ENV === `production` ? `'strict-dynamic' 'nonce-${nonce}'` : `'unsafe-eval' 'unsafe-inline'`}; img-src 'self' https://pos.gosuslugi.ru https://cdn.chelzoo.tech; font-src 'self' https://cdn.chelzoo.tech; media-src 'self' https://storage.yandexcloud.net; frame-src https://pos.gosuslugi.ru; connect-src 'self' https://cdn.chelzoo.tech; manifest-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests;`);
});
