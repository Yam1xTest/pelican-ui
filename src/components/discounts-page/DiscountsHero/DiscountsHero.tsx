import { Rules } from "@/src/common/types";
import { DiscountsRulesCard } from "./components/DiscountsRulesCard";

export function DiscountsHero({
  title,
  rulesCards,
}: {
  title:string
  rulesCards: Rules[]
}) {
  return (
    <section
      className="discounts-hero"
      data-testid="discounts-hero"
    >
      <h1 className="discounts-hero__title container">{title}</h1>
      <div className="discounts-hero__rules">
        <p className="discounts-hero__rules-title container">Чтобы приобрести льготный билет, нужно</p>
        <ol className="discounts-hero__rules-list container">
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
