import { Rules } from "@/src/common/types";
import { DiscountsRulesCard } from "./components/DiscountsRulesCard";

export function DiscountsTerms({
  title,
  rulesCards,
}: {
  title:string
  rulesCards: Rules[]
}) {
  return (
    <section
      className="discounts-terms"
      data-testid="discounts-terms"
    >
      <h1 className="discounts-terms__title container">{title}</h1>
      <div className="discounts-terms__rules">
        <p className="discounts-terms__rules-title container">Чтобы приобрести льготный билет, нужно</p>
        <ol className="discounts-terms__rules-list container">
          {rulesCards.map((card) => (
            <DiscountsRulesCard
              key={card.id}
              text={card.text}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
