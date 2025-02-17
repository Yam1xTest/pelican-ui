import Link from "next/link";
import { AppRoute } from "@/src/common/enum";
import { CategoryProps } from "@/src/common/types";
import { IconArrow } from "./components/IconArrow/IconArrow";

export function Category({
  className,
  id,
  title,
}: {
  className: string,
  id: CategoryProps['id'],
  title: CategoryProps['title'],
}) {
  return (
    <li className={`${className} category`}>
      <Link
        className="category__wrapper"
        href={{
          pathname: `${AppRoute.DOCUMENTS}/${id}`,
        }}
        aria-label={`Перейти на страницу категории ${title}`}
        data-testid="category"
      >
        <h2 className="category__title">{title}</h2>
        <span className="category__arrow">
          <IconArrow className="category__icon-arrow" />
        </span>
      </Link>
    </li>
  );
}
