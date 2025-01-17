import { AppRoute } from "@/src/common/enum";
import { NewsProps } from "@/src/common/mocks/news-page-mock/news-mock";
import Link from "next/link";

export function NewsSliderCard({
  id,
  title,
  description,
}: {
  id: NewsProps['id']
  title: NewsProps['title'],
  description: NewsProps['description']
}) {
  return (
    <Link
      href={`${AppRoute.NEWS}/${id}`}
      className="news-slider-card"
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
