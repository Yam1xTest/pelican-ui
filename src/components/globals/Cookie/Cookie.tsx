import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { OptionYM } from '@/src/common/types';
import { Button } from '../Button/Button';

const COOKIE_ACCEPT = `cookieAccept`;
const MOCK_COOKIE_TEXT = `Мы обрабатываем Cookies для аналитики и маркетинга, чтобы вам было удобно пользоваться нашим веб-сайтом.`;
const MOCK_COOKIE_BUTTON_TEXT = `Хорошо`;

const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export const optionYandexMetrika: OptionYM = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
};

const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

function Cookie() {
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE_ACCEPT) === `true`) {
      setIsCookie(true);
    }
  }, []);

  if (isCookie) {
    return null;
  }

  return (
    <div
      className="cookie"
      data-testid="cookie"
      role="region"
      aria-labelledby="cookie-text"
    >
      <div className="cookie__inner">
        <div
          className="cookie__text"
          id="cookie-text"
        >
          {MOCK_COOKIE_TEXT}
        </div>
        <Button
          className="cookie__accept"
          theme="primary"
          onClick={acceptCookie}
          data-testid="cookie-button"
        >
          {MOCK_COOKIE_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );

  function acceptCookie() {
    setCookie(COOKIE_ACCEPT, true);
    setIsCookie(true);

    if (isMetricsEnabled) {
      window.ym(Number(yandexId), `init`, optionYandexMetrika);
    }
  }
}

export default Cookie;
