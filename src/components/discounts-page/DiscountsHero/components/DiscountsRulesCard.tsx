export function DiscountsRulesCard({
  text,
  number,
}: {
  text: string,
  number: number
}) {
  return (
    <li className="discounts-rules-card">
      <div className="discounts-rules-card__number">
        {number}
      </div>
      <div className="discounts-rules-card__text">
        {text}
      </div>
    </li>
  );
}
