import { ImageWithButtonGridComponentProps } from "@/src/common/types";
import Link from "next/link";
import { AppRoute } from "@/src/common/enum";
import { ImageWithButtonGridImages } from "./components/ImageWithButtonGridImages/ImageWithButtonGridImages";

export function ImageWithButtonGrid({
  title,
  description,
  largeImage,
  smallImage,
  isContactZoo,
}: Omit<ImageWithButtonGridComponentProps, 'id' | '__component'>) {
  return (
    <section
      className="image-with-button-grid"
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
          href={AppRoute.CONTACT_ZOO}
          className="image-with-button-grid__btn button button--primary"
          aria-label="Перейти на страницу контактного зоопарка"
          data-testid="contact-zoo-btn"
        >
          Подробнее
        </Link>
      </div>
      {isContactZoo && <div>!!!</div>}
    </section>
  );
}
