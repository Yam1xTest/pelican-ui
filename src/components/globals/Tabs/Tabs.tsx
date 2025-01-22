import { forwardRef, useImperativeHandle, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Tabs({
  availableYears,
}: {
  availableYears: number[],
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
            >
              {year}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default forwardRef(Tabs);
