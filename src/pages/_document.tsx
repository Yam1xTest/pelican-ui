/* eslint-disable react/no-array-index-key */
/* eslint-disable @stylistic/max-len */
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
            .paw-container {
              position: fixed;
              z-index: 99;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              background-color: #f6f5f5;
              opacity: 1;
            }

            .paw {
              position: absolute;
              width: 30px;
              height: 30px;
              animation: pawStep 2s ease-in-out infinite;
            }

            @keyframes pawStep {
              0%   { opacity: 0; }
              30%  { opacity: 1; }
              60%  { opacity: 1; }
              100% { opacity: 0; }
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
          <div className="paw-container">
            {Array.from({
              length: 8,
            })
              .map((_, i) => (
                <div
                  className="paw"
                  key={i}
                  style={{
                    animationDelay: `${i * 0.25}s`,
                    transform: `rotate(${i * 45}deg) translateY(-50px) rotate(${i + 140}deg)`,
                  }}
                >
                  {/* paste svg directly instead of .svg file for speed load without delay */}
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 33 31"
                  >
                    <path
                      d="m27.28 19.24-.47 3.65-1.91 3.25-5.15.97-15.66-3.7 2.4-7.63L8.83 9.6l7.46-5.3 3.59 3.02 7.39 11.91Z"
                      fill="#F2E3EB"
                    />
                    <path
                      d="m17.7 1.67-1.2-.18a1.04 1.04 0 0 0-1.18 1.25l.12.52c.1.44.29.84.57 1.19l5.18 6.37c.52.64 1 1.31 1.42 2.02l3.98 6.62a1.24 1.24 0 0 1-1.84 1.61l-2.96-2.34-7.19-5.3-3.59-2.67-2.55-2.01a4.56 4.56 0 0 0-.68-.45l-.87-.46c-.6-.32-1.3-.37-1.94-.13l-.26.1a1.64 1.64 0 0 0-.77 2.48l.27.39c.13.19.3.35.47.5l16.82 13.3a.92.92 0 0 1-.73 1.62l-2.82-.5-2.9-.81-10.3-3.38a2.9 2.9 0 0 0-1.24-.13l-1.12.14a1.22 1.22 0 0 0-.74 2.05l.85.9c.3.31.66.57 1.05.75l1.94.89 4.72 1.58 3.63 1.2 3.64.82c2.19.3 4.4.42 6.6.36l3.29-.1 1.19-.14a4.2 4.2 0 0 0 3.2-2.18c.3-.56.46-1.19.48-1.82v-.38a5.69 5.69 0 0 0-.2-1.67l-1.11-3.98-.9-2.08a41.88 41.88 0 0 0-2.73-5.27l-1.17-1.91a20.76 20.76 0 0 0-2.66-3.47l-4.3-4.54c-.4-.4-.9-.68-1.46-.76Z"
                      fill="#D993BA"
                      stroke="#D993BA"
                    />
                    <path
                      d="m12.95 8.23-2.79 1.3-.45.18-.37.1a2.81 2.81 0 0 0-1.94 3.22l.27 1.42c.39 2.09.13 4.24-.73 6.18l-.38.84a.88.88 0 0 1-1.62-.68l.25-.63a13.6 13.6 0 0 0 .78-6.77l-.44-3.12-.01-.03a.86.86 0 0 1 .6-1.3l2.48-.39c.18-.03.35-.07.52-.14l1.32-.5a9.03 9.03 0 0 0 4.47-3.75l.74-1.23c.22-.37.8-.23.82.2a4.44 4.44 0 0 1-1.59 3.75l-.64.53c-.4.32-.83.6-1.3.82Z"
                      fill="#D993BA"
                      stroke="#D993BA"
                    />
                  </svg>
                </div>
              ))}
          </div>

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

        <Script
          id="gosWidgetScript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             (function(){
            "use strict";
             function ownKeys(e, t) {
                  var o = Object.keys(e);
                  if (Object.getOwnPropertySymbols) {
                      var n = Object.getOwnPropertySymbols(e);
                      if (t) n = n.filter(function(t) {
                          return Object.getOwnPropertyDescriptor(e, t).enumerable
                      });
                      o.push.apply(o, n)
                  }
                  return o
              }

              function _objectSpread(e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var o = null != arguments[t] ? arguments[t] : {};
                      if (t % 2) ownKeys(Object(o), true).forEach(function(t) {
                          _defineProperty(e, t, o[t])
                      });
                      else if (Object.getOwnPropertyDescriptors) Object.defineProperties(e, Object.getOwnPropertyDescriptors(o));
                      else ownKeys(Object(o)).forEach(function(t) {
                          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                      })
                  }
                  return e
              }

              function _defineProperty(e, t, o) {
                  if (t in e) Object.defineProperty(e, t, {
                      value: o,
                      enumerable: true,
                      configurable: true,
                      writable: true
                  });
                  else e[t] = o;
                  return e
              }
              var POS_PREFIX_2 = "--pos-banner-fluid-2__",
                  posOptionsInitial = {
                      "grid-template-columns": "100%",
                      "grid-template-rows": "310px auto",
                      "decor-grid-column": "initial",
                      "decor-grid-row": "initial",
                      "decor-padding": "30px 30px 0 30px",
                      "bg-url": "url('https://pos.gosuslugi.ru/bin/banner-fluid/2/banner-fluid-bg-2-small.svg')",
                      "bg-position": "calc(10% + 64px) calc(100% - 20px)",
                      "bg-size": "cover",
                      "content-padding": "0 30px 30px 30px",
                      "slogan-font-size": "20px",
                      "slogan-line-height": "32px",
                      "logo-wrap-padding": "20px 30px 30px 40px",
                      "logo-wrap-top": "0",
                      "logo-wrap-bottom": "initial",
                      "logo-wrap-border-radius": "0 0 0 80px"
                  },
                  setStyles = function(e, t) {
                      Object.keys(e).forEach(function(o) {
                          t.style.setProperty(POS_PREFIX_2 + o, e[o])
                      })
                  },
                  removeStyles = function(e, t) {
                      Object.keys(e).forEach(function(e) {
                          t.style.removeProperty(POS_PREFIX_2 + e)
                      })
                  };

              function changePosBannerOnResize() {
                  var e = document.documentElement,
                      t = _objectSpread({}, posOptionsInitial),
                      o = document.getElementById("js-show-iframe-wrapper"),
                      n = o ? o.offsetWidth : document.body.offsetWidth;
                  if (n > 405) t["slogan-font-size"] = "24px", t["logo-wrap-padding"] = "30px 50px 30px 70px";
                  if (n > 500) t["grid-template-columns"] = "min-content 1fr", t["grid-template-rows"] = "100%", t["decor-grid-column"] = "2", t["decor-grid-row"] = "1", t["decor-padding"] = "30px 30px 30px 0", t["content-padding"] = "30px", t["bg-position"] = "0% calc(100% - 70px)", t["logo-wrap-padding"] = "30px 30px 24px 40px", t["logo-wrap-top"] = "initial", t["logo-wrap-bottom"] = "0", t["logo-wrap-border-radius"] = "80px 0 0 0";
                  if (n > 585) t["bg-position"] = "0% calc(100% - 6px)";
                  if (n > 800) t["bg-url"] = "url('https://pos.gosuslugi.ru/bin/banner-fluid/2/banner-fluid-bg-2.svg')", t["bg-position"] = "0% center";
                  if (n > 1020) t["slogan-font-size"] = "32px", t["line-height"] = "40px", t["logo-wrap-padding"] = "30px 30px 24px 50px";
                  setStyles(t, e)
              }
              changePosBannerOnResize(), window.addEventListener("resize", changePosBannerOnResize), window.onunload = function() {
                  var e = document.documentElement;
                  window.removeEventListener("resize", changePosBannerOnResize), removeStyles(posOptionsInitial, e)
              };
          })()
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
