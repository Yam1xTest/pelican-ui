import { CategoriesComponentProps } from "@/src/common/types";
import { Category } from "./components/Category/Category";

export function Categories({
  title,
  categories,
}: Omit<CategoriesComponentProps, 'id' | '__component'>)
 {
  return (
    <section
      className="categories container"
      data-testid="categories"
    >
      <h1 className="categories__title">{title}</h1>
      <ul className="categories__list">
        {categories.map(({
          id,
          pageUrl,
          title,
        }) => (
          <Category
            key={id}
            id={id}
            className="categories__item"
            data-testid="category"
            pageUrl={pageUrl}
            title={title}
          />
        ))}
      </ul>
    </section>
  );
}
