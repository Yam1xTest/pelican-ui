import { CardsComponentProps } from "@/src/common/types";
import { ReactNode } from "react";
import clsx from "clsx";
import { Card } from "./components/Card/Card";

export function Cards({
  title,
  cards,
  className,
  dataTestId,
  children,
  childrenList,
}: Omit<CardsComponentProps, 'id' | '__component'> & {
  children?: ReactNode
  childrenList?: ReactNode
  className?: string;
  dataTestId?: string;
}) {
  return (
    <section
      className={clsx(
        `container cards`,
        className,
      )}
      data-testid={dataTestId || `cards`}
    >
      <h1 className="cards__title">{title}</h1>
      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="cards__card"
            dataTestId="cards-card"
            image={card.image}
            title={card.title}
            description={card.description}
            labels={card.labels}
            link={card.link}
          />
        ))}
        {childrenList}
      </ul>
      {children}
    </section>
  );
}
