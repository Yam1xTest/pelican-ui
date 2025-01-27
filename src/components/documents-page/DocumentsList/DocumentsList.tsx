import { DocumentsProps } from "@/src/common/types";
import { DocumentCard } from "@/src/components/documents-page/DocumentsList/components/DocumentCard/DocumentCard";
import Tabs from "@/src/components/globals/Tabs/Tabs";

export function DocumentsList({
  // TODO: Change props names to universal component
  categoryTitle,
  availableYears,
  documents,
  tabsRef,
}: {
  categoryTitle: string,
  availableYears: number[],
  documents: DocumentsListComponentProps[],
  tabsRef: React.Ref<any>,
}) {
  return (
    <section
      className="documents container"
      data-testid="documents"
    >
      <h1 className="documents__title">{categoryTitle}</h1>
      <Tabs
        availableYears={availableYears}
        ref={tabsRef}
      />
      <ul
        className="documents__list"
      >
        {documents?.map(({
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
