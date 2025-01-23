import { DocumentsCategoriesProps, DocumentsPageProps } from "@/src/common/types";
import { DocumentsCategory } from "@/src/components/documents-page/DocumentsCategories/components/DocumentsCategory/DocumentsCategory";

export function DocumentsCategories({
  documentsTitle,
  documentsCategories,
}: {
  documentsTitle: DocumentsPageProps['documentsTitle'],
  documentsCategories: DocumentsCategoriesProps[],
}) {
  return (
    <section
      className="documents-categories container"
      data-testid="documents-categories"
    >
      <h1 className="documents-categories__title">{documentsTitle}</h1>
      <ul className="documents-categories__list">
        {documentsCategories.map(({
          id,
          title,
        }) => (
          <DocumentsCategory
            key={id}
            className="documents-categories__item"
            data-testid="documents-category"
            id={id}
            title={title}
          />
        ))}
      </ul>
    </section>
  );
}
