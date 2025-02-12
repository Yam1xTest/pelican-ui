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
      className="contact-zoo"
      data-testid="image-with-button-grid"
    >
      <div className="contact-zoo__wrapper container">
        <div className="contact-zoo__text">
          <h2 className="contact-zoo__title">{title}</h2>
          <p className="contact-zoo__description">{description}</p>
        </div>
        <ImageWithButtonGridImages
          className="contact-zoo__images"
          largeImage={largeImage}
          smallImage={smallImage}
        />
        <Link
          href={AppRoute.CONTACT_ZOO}
          className="contact-zoo__btn button button--primary"
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
