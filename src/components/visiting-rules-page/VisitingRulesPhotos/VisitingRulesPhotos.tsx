import { VisitingRulesPhotosComponentProps } from "@/src/common/types";
import { VisitingRulesCard } from "../components/VisitingRulesCard/VisitingRulesCard";

export function VisitingRulesPhotos({
  cardsTitle,
  cards,
}: Omit<VisitingRulesPhotosComponentProps, 'id' | '__component'>) {
  return (
    <section
      className="visiting-rules-photos"
      data-testid="visiting-rules-photos"
    >
      <div className="visiting-rules-photos__wrapper">
        <div className="visiting-rules-photos__inner container">
          <h2 className="visiting-rules-photos__header">
            {cardsTitle}
          </h2>
          <ul className="visiting-rules-photos__cards">
            {cards.map((card) => (
              <VisitingRulesCard
                key={card.id}
                label={card.label}
                className="visiting-rules-photos__card"
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
