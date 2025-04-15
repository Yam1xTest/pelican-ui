/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';
import { optionYandexMetrika } from '../components/globals/Cookie/Cookie';

export default function Document() {
  const isMetricsEnabled = process.env.NEXT_PUBLIC_METRICS_ENABLED === `true`;

  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  return (
    <Html lang="ru">
      <Head>
        <style>
          {`
          #static-loader {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }

          #static-loader .static-spinner {
            position: absolute;
            left: calc(50% - 50px);
            top: calc(50% - 50px);
            margin: 0 auto;
            border: 6px solid #0e6e34;
            width: 100px;
            height: 100px;
            animation: rotation 0.5s infinite linear;
          }

          @keyframes rotation {
            from { transform: rotate(0deg); }
            to { transform: rotate(359deg); }
          }
          `}
        </style>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon/favicon.svg"
        />
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="/favicon/site.webmanifest"
        />
      </Head>
      <body>
        <div id="static-loader">
          <div className="static-spinner" />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `
                  html {
                    overflow-y: scroll !important;
                  }
                  body {
                    display: block !important;
                  }
              `,
            }}
          />
        </div>
        <Main />
        <NextScript />

        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                var z = null;m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              var isCookieAccept = document.cookie.includes('cookieAccept=true');

              if (${isMetricsEnabled} && isCookieAccept) {
                ym(${yandexId}, "init", ${JSON.stringify(optionYandexMetrika)})
              }
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${yandexId}`}
              style={{
                position: `absolute`,
                left: `-9999px`,
              }}
              alt=""
            />
          </div>
        </noscript>

      </body>
    </Html>
  );
}
