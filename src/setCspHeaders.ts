export function setCspHeaders(headers: Headers): void {
  // Generate a unique random nonce (base64 string) for each request
  const nonce = Buffer.from(crypto.randomUUID())
    .toString(`base64`);

  // Define the CSP header.
  // In development, allow 'unsafe-eval' and 'unsafe-inline' for easier debugging.
  // In production, allow only scripts and styles with the generated nonce and use 'strict-dynamic'.
  // Note: 'unsafe-inline' is ignored by modern browsers when a 'nonce' is present,
  // but it is included for compatibility with older browsers that do not support nonces.
  const csp = `
    default-src 'none';
    script-src 'self' 'unsafe-inline' 'strict-dynamic' 'nonce-${nonce}' https://mc.yandex.ru https://pos.gosuslugi.ru;
    style-src 'self' 'strict-dynamic' 'nonce-${nonce}';
    img-src 'self' https://pos.gosuslugi.ru https://cdn.chelzoo.tech;
    font-src 'self' https://cdn.chelzoo.tech;
    media-src 'self' https://storage.yandexcloud.net;
    frame-src https://pos.gosuslugi.ru;
    connect-src 'self' https://cdn.chelzoo.tech;
    manifest-src 'self';
    base-uri 'none';
    frame-ancestors 'none';
    form-action 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ` `) // Replace two or more spaces with a single space
    .trim(); // Remove leading and trailing whitespace

  // Add nonce and CSP to headers
  headers.set(`x-nonce`, nonce);
  headers.set(`Content-Security-Policy`, csp);
}
