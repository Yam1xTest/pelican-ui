import { ImageWithButtonGridComponentProps } from "@/src/common/types";
import { AppRoute } from "@/src/common/enum";
import { ImageWithButtonGrid } from "../../globals/ImageWithButtonGrid/ImageWithButtonGrid";

export function HomepageImageWithButtonGrid({
  title,
  description,
  largeImage,
  smallImage,
}: Omit<ImageWithButtonGridComponentProps, 'id' | '__component'>) {
  return (
    <ImageWithButtonGrid
      title={title}
      description={description}
      largeImage={largeImage}
      smallImage={smallImage}
      url={AppRoute.CONTACT_ZOO}
    />
  );
}
