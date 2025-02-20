import dayjs from "dayjs";
import clsx from "clsx";
import { ArticleProps } from "@/src/common/types";
import { MarkdownText } from "../MarkdownText/MarkdownText";

export function Article({
  title,
  date,
  innerContent,
  isFirstBlock,
  isLastBlock,
  className,
}: {
  title: ArticleProps['title'],
  date: ArticleProps['publishedAt'],
  innerContent: ArticleProps['innerContent']
  isFirstBlock: ArticleProps['isFirstBlock']
  isLastBlock: ArticleProps['isLastBlock']
  className?: string
}) {
  return (
    <div
      className={clsx(
        `article`,
        className,
        {
          'first-block': isFirstBlock,
          'last-block': isLastBlock,
        },
      )}
      data-testid="article"
    >
      {date
        && (
          <span className="article__date">
            {
              dayjs(date)
                .format(`DD.MM.YYYY`)
            }
          </span>
        )}
      <h1 className="article__title">{title}</h1>
      <MarkdownText className="article__content">
        {innerContent}
      </MarkdownText>
    </div>
  );
}
