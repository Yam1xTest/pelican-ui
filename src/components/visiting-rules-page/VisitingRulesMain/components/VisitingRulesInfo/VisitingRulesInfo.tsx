import { VisitingRulesMainComponentProps } from "@/src/common/types";
import Link from "next/link";

export function VisitingRulesInfo({
  title,
  link,
  description,
}: Pick<VisitingRulesMainComponentProps, 'title' | 'link' | 'description'>) {
  const {
    path, label,
  } = link;

  return (
    <div className="visiting-rules-info container">
      <div className="visiting-rules-info__header">
        <h1 className="visiting-rules-info__title">
          {title}
        </h1>
        <Link
          className="text-link visiting-rules-info__link"
          href={path}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </Link>
      </div>
      <div className="visiting-rules-info__description">
        {description}
      </div>
    </div>
  );
}
