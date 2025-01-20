
import { BlockTypes } from "../../enum";
import { NotFoundComponentProps } from "../../types";

type NotFoundPageProps = {
  id: number,
  title: string;
  blocks: (
    NotFoundComponentProps
  )[];
};

const MOCK_NOT_FOUND: NotFoundComponentProps = {
  id: 1,
  __component: BlockTypes.NOT_FOUND,
};

export const MOCK_NOT_FOUND_PAGE: NotFoundPageProps = {
  id: 1,
  title: `Страница не найдена`,
  blocks: [MOCK_NOT_FOUND],
};
