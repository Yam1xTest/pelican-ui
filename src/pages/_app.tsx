/* eslint-disable @typescript-eslint/quotes */
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import localFont from "next/font/local";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../components/globals/Layout/Layout';
import { NotFound } from '../components/not-found-page/NotFound/NotFound';
import { WindowWidthProvider } from '../common/providers/WindowWidthProvider';
import {
  MOCK_POPUP_TICKET_BUY_TEXT,
  MOCK_TICKET_BUY_LINK,
  MOCK_EMAIL,
  MOCK_PHONE,
  MOCK_NAVIGATION_LINKS,
  MOCK_FOOTER_ABOUT_LINKS,
  MOCK_FOOTER_USER_LINKS,
  MOCK_OFFICIAL_LINKS,
  MOCK_FOOTER_NAV_TITLE_LEFT,
  MOCK_FOOTER_NAV_TITLE_RIGHT,
  MOCK_TICKETS_POPUP_GENERAL,
  MOCK_TICKETS_POPUP_SUBSIDIZED,
  MOCK_TICKETS_POPUP_RULES_IMAGES,
  MOCK_TICKETS_POPUP_REFUND_REASONS,
} from '../common/mocks/globals-mock';
import { TicketPopupProvider } from '../common/providers/TicketPopupProvider';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const {
    pathname,
    query,
  } = useRouter();

  useEffect(() => {
    if (!query?.pageSize) {
      document.body.scroll({
        top: 0,
      });
    }
  }, [pathname, query]);

  if (!pageProps.globalData) {
    return (
      <div className={inter.variable}>
        <NotFound />
      </div>
    );
  }

  const {
    navigationLinks,
    email,
    phone,
    popupTicketBuyText,
    ticketBuyLink,
    footerAboutLinks,
    footerUserLinks,
    officialLinks,
    footerNavTitleLeft,
    footerNavTitleRight,
    ticketsPopupGeneral,
    ticketsPopupSubsidized,
    ticketsPopupRulesImages,
    ticketsPopupRefundReasons,
  } = pageProps.globalData;

  return (
    <WindowWidthProvider>
      <TicketPopupProvider>
        <div className={inter.variable}>
          <Layout
            navigationLinks={navigationLinks}
            officialLinks={officialLinks}
            footerAboutLinks={footerAboutLinks}
            footerUserLinks={footerUserLinks}
            email={email}
            phone={phone}
            popupTicketBuyText={popupTicketBuyText}
            ticketBuyLink={ticketBuyLink}
            footerNavTitleLeft={footerNavTitleLeft}
            footerNavTitleRight={footerNavTitleRight}
            ticketsPopupGeneral={ticketsPopupGeneral}
            ticketsPopupSubsidized={ticketsPopupSubsidized}
            ticketsPopupRulesImages={ticketsPopupRulesImages}
            ticketsPopupRefundReasons={ticketsPopupRefundReasons}
          >
            <Component {...pageProps} />
          </Layout>
        </div>
      </TicketPopupProvider>
    </WindowWidthProvider>
  );
}

App.getInitialProps = async () => ({
  // TODO Uncomment when the api appears, there will be static data here
  // if (process.env.APP_ENV === `test`) {
  //   return {
  //     props: {
  //       navigationLinks: NAVIGATION_LINKS,
  //     },
  //   };
  // }

  // TODO there will be a request in the Strapi api here
  pageProps: {
    globalData: {
      popupTicketBuyText: MOCK_POPUP_TICKET_BUY_TEXT,
      ticketBuyLink: MOCK_TICKET_BUY_LINK,
      email: MOCK_EMAIL,
      phone: MOCK_PHONE,
      navigationLinks: MOCK_NAVIGATION_LINKS,
      footerAboutLinks: MOCK_FOOTER_ABOUT_LINKS,
      footerUserLinks: MOCK_FOOTER_USER_LINKS,
      officialLinks: MOCK_OFFICIAL_LINKS,
      footerNavTitleLeft: MOCK_FOOTER_NAV_TITLE_LEFT,
      footerNavTitleRight: MOCK_FOOTER_NAV_TITLE_RIGHT,
      ticketsPopupGeneral: MOCK_TICKETS_POPUP_GENERAL,
      ticketsPopupSubsidized: MOCK_TICKETS_POPUP_SUBSIDIZED,
      ticketsPopupRulesImages: MOCK_TICKETS_POPUP_RULES_IMAGES,
      ticketsPopupRefundReasons: MOCK_TICKETS_POPUP_REFUND_REASONS,
    },
  },
});
