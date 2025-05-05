import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppRoute } from '../enum';

export function useGosBannerWidget() {
  const {
    asPath,
  } = useRouter();
  const isActive = asPath === AppRoute.HOME;

  useEffect(() => {
    if (!isActive) return;

    if (window.Widget) {
      window.Widget(`https://pos.gosuslugi.ru/form`, 284230);
    } else {
      const script = document.createElement(`script`);
      script.src = `https://pos.gosuslugi.ru/bin/script.min.js`;
      script.async = true;
      script.onload = () => {
        window.Widget(`https://pos.gosuslugi.ru/form`, 284230);
      };
      document.body.appendChild(script);
    }
  }, [isActive]);
}
