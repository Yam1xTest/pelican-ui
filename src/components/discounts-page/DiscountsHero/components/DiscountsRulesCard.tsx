export function DiscountsRulesCard({
  text,
}: {
  text: string,
}) {
  return (
    <li className="discounts-rules-card">
      <div className="discounts-rules-card__text">
        {text}
      </div>
    </li>
  );
}
