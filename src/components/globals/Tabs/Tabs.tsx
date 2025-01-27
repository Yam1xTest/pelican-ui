import { forwardRef, useImperativeHandle, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DocumentsTabsProps } from "@/src/common/types";

function Tabs({
  availableYears,
}: {
  availableYears: DocumentsTabsProps[`availableYears`],
}, ref: React.Ref<any>) {
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    setIsActiveIndex,
  }));

  return (
    <ul
      className="tabs"
    >
      {availableYears
        .map((year, index) => (
          <li
            className="tabs__tab"
            key={year}
          >
            <Link
              className={`tabs__button tabs__button${index === isActiveIndex ? `--active` : ``}`}
              href={{
                pathname: router.pathname,
                query: {
                  id: router.query.id,
                  year,
                },
              }}
              onClick={() => setIsActiveIndex(index)}
              aria-label={`Отобразить документы за ${year} год`}
            >
              {year}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default forwardRef(Tabs);
