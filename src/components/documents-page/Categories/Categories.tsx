import { CategoriesProps, DocumentsPageProps } from "@/src/common/types";
import { Category } from "./components/Category/Category";

export function Categories({
  documentsTitle,
  categories,
}: {
  documentsTitle: DocumentsPageProps['documentsTitle'],
  categories: CategoriesProps[],
}) {
  return (
    <section
      className="categories container"
      data-testid="categories"
    >
      <h1 className="categories__title">{documentsTitle}</h1>
      <ul className="categories__list">
        {categories.map(({
          id,
          title,
        }) => (
          <Category
            key={id}
            className="categories__item"
            data-testid="category"
            id={id}
            title={title}
          />
        ))}
      </ul>
    </section>
  );
}
