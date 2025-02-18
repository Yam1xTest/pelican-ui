import { AppRoute } from "@/src/common/enum";
import { ArticleProps } from "@/src/common/types";
import Link from "next/link";

export function NewsSliderCard({
  id,
  title,
  description,
}: {
  id: ArticleProps['id']
  title: ArticleProps['title'],
  description: ArticleProps['description']
}) {
  return (
    <Link
      href={`${AppRoute.NEWS}/${id}`}
      className="news-slider-card"
      data-testid="slider-card"
      aria-label={`Перейти на новость с заголовком ${title}`}
    >
      <h3 className="news-slider-card__title">
        {title}
      </h3>
      {description && (
        <p className="news-slider-card__description">
          {description}
        </p>
      )}
    </Link>
  );
}
