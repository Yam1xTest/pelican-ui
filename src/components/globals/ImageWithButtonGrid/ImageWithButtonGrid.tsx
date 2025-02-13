import { ImageWithButtonGridComponentProps } from "@/src/common/types";
import Link from "next/link";
import clsx from "clsx";
import { ImageWithButtonGridImages } from "./components/ImageWithButtonGridImages/ImageWithButtonGridImages";

export function ImageWithButtonGrid({
  title,
  description,
  largeImage,
  smallImage,
  url,
  isInternalPage,
}: Omit<ImageWithButtonGridComponentProps, 'id' | '__component'>) {
  return (
    <section
      className={clsx(
        `image-with-button-grid`,
        {
          'image-with-button-grid--internal-page': isInternalPage,
        },
      )}
      data-testid="image-with-button-grid"
    >
      <div className="image-with-button-grid__wrapper container">
        <div className="image-with-button-grid__text">
          <h2 className="image-with-button-grid__title">{title}</h2>
          <p className="image-with-button-grid__description">{description}</p>
        </div>
        <ImageWithButtonGridImages
          className="image-with-button-grid__images"
          largeImage={largeImage}
          smallImage={smallImage}
        />
        <Link
          href={url}
          className="image-with-button-grid__btn button button--primary"
          aria-label="Перейти на страницу контактного зоопарка"
          data-testid="image-grid-btn"
        >
          Подробнее
        </Link>
      </div>
    </section>
  );
}
