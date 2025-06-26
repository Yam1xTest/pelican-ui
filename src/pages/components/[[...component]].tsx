import { ComponentName } from "@/src/common/enum";
import { useSetYearInQuery } from "@/src/common/hooks/useSetYearInQuery";
import { MOCK_DOCUMENTS_CATEGORIES } from "@/src/common/mocks/collections-mock/documents-categories-collection-mock";
import { MOCK_DOCUMENTS } from "@/src/common/mocks/collections-mock/documents-collection-mock";
import { MOCK_DISCOUNTS_CATEGORIES } from "@/src/common/mocks/discounts-page-mock/blocks/discounts-categories-mock";
import { MOCK_DISCOUNTS_TERMS } from "@/src/common/mocks/discounts-page-mock/blocks/discounts-terms-mock";
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
import Link from "next/link";
import { useRouter } from "next/router";

export default function ComponentsPage() {
  const router = useRouter();
  const {
    query,
  } = router;

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
      </ul>
    </div>
  );
}

ComponentsPage.getLayout = (page: React.ReactNode) => page;
