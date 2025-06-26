import { ComponentName } from "@/src/common/enum";
import { MOCK_DISCOUNTS_CATEGORIES } from "@/src/common/mocks/discounts-page-mock/blocks/discounts-categories-mock";
import { DiscountsCategories } from "@/src/components/discounts-page/DiscountsCategories/DiscountsCategories";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ComponentsPage() {
  const {
    query,
  } = useRouter();
  const componentName = query.component?.[0];

  if (componentName === ComponentName.DISCOUNTS_CATEGORIES) {
    return <DiscountsCategories {...MOCK_DISCOUNTS_CATEGORIES} />;
  }

  return (
    <div className="container components-page">
      <ul className="components-page__list">
        <li className="components-page__item">
          <Link href={ComponentName.DISCOUNTS_CATEGORIES}>Discounts categories</Link>
        </li>
      </ul>
    </div>
  );
}

ComponentsPage.getLayout = (page: React.ReactNode) => page;
