import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function Tabs({
  setChosenYear,
}: {
  setChosenYear: React.Dispatch<React.SetStateAction<number>>,
}) {
  const currentYear = dayjs()
    .year();

  useEffect(() => {
    setChosenYear(currentYear);
  }, []);

  const [isActiveIndex, setIsActiveIndex] = useState(0);

  function GetYears(): number[] {
    const years = [];

    for (let year = currentYear; year >= currentYear - 2; year--) {
      years.push(year);
    }
    return years;
  }

  return (
    <ul
      className="documents-tabs"
    >
      {GetYears()
        .map((year, index) => (
          <li
            className="dockument-tabs__tab"
            key={year}
          >
            <button
              className={`documents-tabs__button documents-tabs__button${index === isActiveIndex ? `--active` : ``}`}
              type="button"
              onClick={() => {
                setIsActiveIndex(index);
                setChosenYear(year);
              }}
            >
              {year}
            </button>
          </li>
        ))}
    </ul>
  );
}
