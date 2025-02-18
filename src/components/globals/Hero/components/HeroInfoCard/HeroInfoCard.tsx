import { HeroComponentProps } from "@/src/common/types";
import clsx from "clsx";

export function HeroInfoCard({
  className,
  infoCardTitle,
  infoCardDescription,
  isInteralPage,
}: {
  className: string,
  infoCardTitle?: HeroComponentProps['infoCardTitle'],
  infoCardDescription: HeroComponentProps['infoCardDescription'],
  isInteralPage: HeroComponentProps['isInteralPage'],
}) {
  return (
    <div className={clsx(
      `hero-info-card`,
      className,
      {
        'hero-info-card--internal-page': isInteralPage,
      },
    )}
    >
      {infoCardTitle && <p className="hero-info-card__title">{infoCardTitle}</p>}
      <p className="hero-info-card__description">{infoCardDescription}</p>
    </div>
  );
}
