import Image from "next/image";
import { useWindowWidth } from "@/src/common/hooks/useWindowSize";
import { ImageWithButtonGridComponentProps } from "@/src/common/types";

export function ImageWithButtonGridImages({
  className,
  largeImage,
  smallImage,
}: {
  className: string;
  largeImage: ImageWithButtonGridComponentProps["largeImage"];
  smallImage: ImageWithButtonGridComponentProps["smallImage"];
}) {
  const {
    isDesktop,
  } = useWindowWidth();

  return (
    <div className={`${className} grid-images`}>
      <div className="grid-images__wrapper">
        <Image
          className="grid-images__image"
          src={largeImage.url}
          alt={largeImage.alternativeText}
          fill
          sizes="(max-width: 768px) 98vw, (max-width: 1366px) 48vw, 30vw"
        />
      </div>
      {isDesktop && smallImage?.url && (
        <div className="grid-images__wrapper">
          <Image
            className="grid-images__image"
            src={smallImage.url}
            alt={smallImage.alternativeText}
            fill
            sizes="33vw"
          />
        </div>
      )}
    </div>
  );
}
