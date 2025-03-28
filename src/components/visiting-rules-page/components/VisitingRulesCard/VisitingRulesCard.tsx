import { VisitingRulesCardProps } from '@/src/common/types';
import Image from 'next/image';
import clsx from 'clsx';

export function VisitingRulesCard({
  label,
  phone,
  iconUrl,
  isWarning,
  isFirst,
  className,
} : VisitingRulesCardProps & {
  isWarning?: boolean,
  isFirst?: boolean,
  className?: string,
}) {
  return (
    <li className={clsx(`visiting-rules-card ${className}`, {
      'visiting-rules-hero-card--first': isFirst,
    })}
    >

      {iconUrl && (
        <span className="visiting-rules-hero-card__icon">
          <Image
            src={iconUrl}
            fill
            alt={label}
          />
        </span>
      )}

      {/* TODO: it will need to be change on svg icon */}
      {isWarning && (
        <div className="visiting-rules-warnings-card__icon">
          ❗
        </div>
      )}

      {phone && (
        <div className="visiting-rules-emergency-card__phone">
          {phone}
        </div>
      )}

      <div className={clsx(`visiting-rules-card__label ${className}__label`, {
        'visiting-rules-hero-card__label--first': isFirst,
      })}
      >
        {label}
      </div>
    </li>
  );
}
