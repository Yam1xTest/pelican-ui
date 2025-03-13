import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { Button } from '../Button/Button';

const cookieAccept = `cookieAccept`;

function Cookie() {
  const [isCookie, setIsCookie] = useState(true);

  useEffect(() => {
    if (getCookie(cookieAccept) === `true`) {
      setIsCookie(true);
    } else {
      setIsCookie(false);
    }
  }, []);

  if (isCookie) {
    return null;
  }

  return (
    <div
      className="cookie"
      data-testid="cookie"
    >
      <div className="cookie__inner">
        <div className="cookie__text">
          Мы обрабатываем Cookies для аналитики и маркетинга, чтобы вам было удобно пользоваться нашим веб-сайтом. Пожалуйста, ознакомьтесь с
          <Link
            href="#"
            className="cookie__link text-link"
          >
            Политикой использования Cookies
          </Link>
        </div>

        <Button
          className="cookie__accept"
          theme="primary"
          onClick={acceptCookie}
        >
          Хорошо
        </Button>
      </div>
    </div>
  );

  function acceptCookie() {
    setCookie(cookieAccept, true);
    setIsCookie(true);
  }
}

export default Cookie;
