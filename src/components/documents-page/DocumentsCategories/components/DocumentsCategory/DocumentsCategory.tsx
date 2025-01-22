import Link from "next/link";
import dayjs from "dayjs";
import { AppRoute } from "@/src/common/enum";
import { IconArrow } from "@/src/components/documents-page/DocumentsCategories/components/DocumentsCategory/components/IconArrow/IconArrow";

export function DocumentsCategory({
  className,
  id,
  title,
}: {
  className: string,
  id: number,
  title: string,
}) {
  const currentYear = dayjs()
    .year();

  return (
    <li className={`${className} documents-category`}>
      <Link
        className="documents-category__wrapper"
        href={{
          pathname: `${AppRoute.DOCUMENTS}/${id}`,
          query: {
            year: currentYear,
          },
        }}
        aria-label={`Перейти на страницу категории ${title}`}
        data-testid="documents-category"
      >
        <h2 className="documents-category__title">{title}</h2>
        <span className="documents-category__arrow">
          <IconArrow className="documents-category__icon-arrow" />
        </span>
      </Link>
    </li>
  );
}
