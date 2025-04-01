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
      className="discounts-hero container"
      data-testid="discounts-hero"
    >
      <h1 className="discounts-hero__title">{title}</h1>
      <div className="discounts-hero__rules">
        <p className="discounts-hero__rules__title">Чтобы приобрести льготный билет, нужно</p>
        <ol className="discounts-hero__rules__list">
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
