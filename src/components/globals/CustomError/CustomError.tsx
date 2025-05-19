import Image from "next/image";
import { AppRoute } from "@/src/common/enum";
import { useWindowWidth } from "@/src/common/hooks/useWindowSize";
import Link from "next/link";
import GeeseImageSrc from "@/public/images/contact-zoo/contact-zoo-geese.svg";
import BearImageSrc from "@/public/images/custom-error/bear.svg";

export function CustomError({
  code,
  message,
}: {
  code: number;
  message: string;
}) {
  const {
    isTablet,
  } = useWindowWidth();

  return (
    <section
      className="custom-error container"
      data-testid="custom-error"
    >
      <h1 className="custom-error__title">{code}</h1>
      <h2 className="custom-error__subtitle">Ой, что-то пошло не так</h2>
      <p className="custom-error__note">{message}</p>
      <Image
        className="custom-error__image"
        src={BearImageSrc}
        unoptimized
        alt="Медведь"
      />
      {isTablet && (
        <Image
          className="custom-error__image"
          src={GeeseImageSrc}
          unoptimized
          alt="Гуси"
        />
      )}
      <Link
        href={AppRoute.HOME}
        className="custom-error__button button button--primary"
      >
        Главная страница
      </Link>
    </section>
  );
}
