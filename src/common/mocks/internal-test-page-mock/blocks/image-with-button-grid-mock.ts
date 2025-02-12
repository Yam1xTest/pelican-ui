import LargeImageSrc from "@/public/images/contact-zoo/contact-zoo-large.png";
import SmallImageSrc from "@/public/images/contact-zoo/contact-zoo-small.png";
import { ImageWithButtonGridComponentProps } from "../../../types";
import { BlockTypes } from "../../../enum";

export const MOCK_IMAGE_WITH_BUTTON_GRID: ImageWithButtonGridComponentProps = {
  id: 4,
  __component: BlockTypes.IMAGE_WITH_BUTTON_GRID,
  title: `Lorem ipsum dolor sit amet, consectetur`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `,
  largeImage: {
    url: LargeImageSrc,
    alternativeText: `Изображение кролика`,
  },
  smallImage: {
    url: SmallImageSrc,
    alternativeText: `Изображение кролика`,
  },
};
