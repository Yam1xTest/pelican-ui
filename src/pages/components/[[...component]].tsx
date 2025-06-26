import { ComponentName } from "@/src/common/enum";
import { useSetYearInQuery } from "@/src/common/hooks/useSetYearInQuery";
import { useTicketPopup } from "@/src/common/hooks/useTicketPopup";
import { MOCK_DOCUMENTS_CATEGORIES } from "@/src/common/mocks/collections-mock/documents-categories-collection-mock";
import { MOCK_DOCUMENTS } from "@/src/common/mocks/collections-mock/documents-collection-mock";
import { MOCK_CONTACT_ZOO_HERO } from "@/src/common/mocks/contact-zoo-page-mock/blocks/hero-mock";
import { MOCK_DISCOUNTS_CATEGORIES } from "@/src/common/mocks/discounts-page-mock/blocks/discounts-categories-mock";
import { MOCK_DISCOUNTS_TERMS } from "@/src/common/mocks/discounts-page-mock/blocks/discounts-terms-mock";
import {
  MOCK_EMAIL,
  MOCK_FOOTER_ABOUT_LINKS,
  MOCK_FOOTER_NAV_TITLE_LEFT,
  MOCK_FOOTER_NAV_TITLE_RIGHT,
  MOCK_FOOTER_USER_LINKS,
  MOCK_NAVIGATION_LINKS,
  MOCK_OFFICIAL_LINKS,
  MOCK_PHONE,
  MOCK_POPUP_TICKET_BUY_TEXT,
  MOCK_TICKETS_POPUP,
} from "@/src/common/mocks/globals-mock";
import { MOCK_SHARED_ARTICLE } from "@/src/common/mocks/internal-test-page-mock/blocks/shared-article";
import { MOCK_SHARED_CARDS } from "@/src/common/mocks/internal-test-page-mock/blocks/shared-cards-mock";
import { MOCK_SHARED_CATEGORIES } from "@/src/common/mocks/internal-test-page-mock/blocks/shared-categories";
import { DiscountsCategories } from "@/src/components/discounts-page/DiscountsCategories/DiscountsCategories";
import { DiscountsTerms } from "@/src/components/discounts-page/DiscountsTerms/DiscountsTerms";
import { DocumentsList } from "@/src/components/documents-page/DocumentsList/DocumentsList";
import { Article } from "@/src/components/globals/Article/Article";
import { Cards } from "@/src/components/globals/Cards/Cards";
import { Categories } from "@/src/components/globals/Categories/Categories";
import { Cookie } from "@/src/components/globals/Cookie/Cookie";
import { CustomError } from "@/src/components/globals/CustomError/CustomError";
import { Footer } from "@/src/components/globals/Footer/Footer";
import { HeaderPopup } from "@/src/components/globals/Header/components/HeaderPopup/HeaderPopup";
import { Header } from "@/src/components/globals/Header/Header";
import { Hero } from "@/src/components/globals/Hero/Hero";
import { TicketsPopup } from "@/src/components/globals/TicketsPopup/TicketsPopup";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ComponentsPage() {
  const router = useRouter();
  const {
    query,
  } = router;

  const {
    isTicketPopupActive,
    handleTicketPopupToggle,
  } = useTicketPopup();

  const componentName = query.component?.[0];

  useSetYearInQuery({
    year: query.year as string,
  });

  if (componentName === ComponentName.DISCOUNTS_CATEGORIES) {
    return <DiscountsCategories {...MOCK_DISCOUNTS_CATEGORIES} />;
  }

  if (componentName === ComponentName.DISCOUNTS_TERMS) {
    return <DiscountsTerms {...MOCK_DISCOUNTS_TERMS} />;
  }

  if (componentName === ComponentName.DOCUMENTS_LIST) {
    const queryYear = Number(query?.year);
    return (
      <DocumentsList
        category={MOCK_DOCUMENTS_CATEGORIES[0]}
        currentYear={queryYear || 2025}
        availableYears={[
          2025,
          2024,
          2023,
        ]}
        documents={MOCK_DOCUMENTS.filter(
          (doc) => doc.category.id === MOCK_DOCUMENTS_CATEGORIES[0].id
          && (Number(doc.date.split(`-`)[0]) === (queryYear || 2025)),
        )}
      />
    );
  }

  if (componentName === ComponentName.ARTICLE) {
    return (
      <Article
        title={MOCK_SHARED_ARTICLE.title}
        date={MOCK_SHARED_ARTICLE.date}
        innerContent={MOCK_SHARED_ARTICLE.innerContent}
        isFirstBlock={false}
        isLastBlock={false}
      />
    );
  }

  if (componentName === ComponentName.CARDS) {
    return (
      <Cards {...MOCK_SHARED_CARDS} />
    );
  }

  if (componentName === ComponentName.CATEGORIES) {
    return (
      <Categories {...MOCK_SHARED_CATEGORIES} />
    );
  }

  if (componentName === ComponentName.COOKIE) {
    return (
      <Cookie isComponentPage />
    );
  }

  if (componentName === ComponentName.CUSTOM_ERROR) {
    return (
      <CustomError
        statusCode={HttpStatusCode.NotFound}
        message="Страница не найдена или не существует"
      />
    );
  }

  if (componentName === ComponentName.FOOTER) {
    return (
      <Footer
        officialLinks={MOCK_OFFICIAL_LINKS}
        footerUserLinks={MOCK_FOOTER_USER_LINKS}
        footerAboutLinks={MOCK_FOOTER_ABOUT_LINKS}
        email={MOCK_EMAIL}
        phone={MOCK_PHONE}
        popupTicketBuyText={MOCK_POPUP_TICKET_BUY_TEXT}
        footerNavTitleLeft={MOCK_FOOTER_NAV_TITLE_LEFT}
        footerNavTitleRight={MOCK_FOOTER_NAV_TITLE_RIGHT}
        footerElementRef={null as any}
      />
    );
  }

  if (componentName === ComponentName.HEADER) {
    return (
      <Header
        navigationLinks={MOCK_NAVIGATION_LINKS}
        email={MOCK_EMAIL}
        phone={MOCK_PHONE}
        popupTicketBuyText={MOCK_POPUP_TICKET_BUY_TEXT}
        overlayElementRef={undefined as any}
        mainElementRef={undefined as any}
        footerElementRef={undefined as any}
        isMobileMenuOpen={false}
        handleMobileMenuToggle={() => {}}
      />
    );
  }

  if (componentName === ComponentName.HEADER_POPUP) {
    return (
      <HeaderPopup
        navigationLinks={MOCK_NAVIGATION_LINKS}
        email={MOCK_EMAIL}
        phone={MOCK_PHONE}
        popupTicketBuyText={MOCK_POPUP_TICKET_BUY_TEXT}
        isActive
        className=""
        handleMobileMenuToggle={() => {}}
      />
    );
  }

  if (componentName === ComponentName.TICKET_POPUP) {
    return (
      <TicketsPopup
        isActive={!isTicketPopupActive}
        handleTicketPopupToggle={handleTicketPopupToggle}
        ticketsPopup={MOCK_TICKETS_POPUP}
        overlayElementRef={null as any}
      />
    );
  }

  if (componentName === ComponentName.HERO) {
    return (
      <Hero
        {...MOCK_CONTACT_ZOO_HERO}
        isInternalPage
      />
    );
  }

  return (
    <div className="container components-page">
      <ul className="components-page__list">
        <h2 className="components-page__subtitle">Discount page components</h2>
        <li className="components-page__item">
          <Link href={ComponentName.DISCOUNTS_CATEGORIES}>Discounts categories</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.DISCOUNTS_TERMS}>Discounts terms</Link>
        </li>
        <h2 className="components-page__subtitle">Documents page components</h2>
        <li className="components-page__item">
          <Link href={ComponentName.DOCUMENTS_LIST}>Documents list</Link>
        </li>
        <h2 className="components-page__subtitle">Global components</h2>
        <li className="components-page__item">
          <Link href={ComponentName.ARTICLE}>Article</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.CARDS}>Cards</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.CATEGORIES}>Categories</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.COOKIE}>Cookie</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.CUSTOM_ERROR}>Custom Error</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.FOOTER}>Footer</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.HEADER}>Header</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.HEADER_POPUP}>Header popup</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.TICKET_POPUP}>Ticket popup</Link>
        </li>
        <li className="components-page__item">
          <Link href={ComponentName.HERO}>Hero</Link>
        </li>
      </ul>
    </div>
  );
}

ComponentsPage.getLayout = (page: React.ReactNode) => page;
