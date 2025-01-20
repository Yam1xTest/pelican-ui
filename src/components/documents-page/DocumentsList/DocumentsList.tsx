import { DocumentsListComponentProps } from "@/src/common/mocks/documents-page-mock/documents-list-mock";
import { DocumentCard } from "@/src/components/documents-page/DocumentsList/components/DocumentCard/DocumentCard";
import { useState } from "react";
import dayjs from "dayjs";
import { Tabs } from "../../globals/Tabs/Tabs";

export function DocumentsList({
  categoryTitle,
  documents,
}: {
  categoryTitle: string,
  documents: DocumentsListComponentProps[],
}) {
  const [chosenYear, setChosenYear] = useState<number>(0);

  return (
    <section
      className="documents container"
      data-testid="documents"
    >
      <h1 className="documents__title">{categoryTitle}</h1>
      <Tabs
        setChosenYear={setChosenYear}
      />
      <ul
        className="documents__list"
      >
        {documents?.filter(({
          date,
        }) => dayjs(date)
          .year() === chosenYear)
          .map(({
            id,
            date,
            showDate,
            title,
            subtitle,
            description,
            files,
          }) => (
            <DocumentCard
              className="documents__item"
              key={id}
              date={date}
              showDate={showDate}
              title={title}
              subtitle={subtitle}
              description={description}
              files={files}
            />
          ))}
      </ul>
    </section>
  );
}
