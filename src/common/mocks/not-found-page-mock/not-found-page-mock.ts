
import { BlockTypes } from "../../enum";
import { NotFoundComponentProps, NotFoundPageProps } from "../../types";

const MOCK_NOT_FOUND: NotFoundComponentProps = {
  id: 1,
  __component: BlockTypes.NOT_FOUND,
};

export const MOCK_NOT_FOUND_PAGE: NotFoundPageProps = {
  id: 1,
  title: `Страница не найдена`,
  blocks: [MOCK_NOT_FOUND],
};
