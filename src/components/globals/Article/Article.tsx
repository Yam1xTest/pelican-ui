import dayjs from "dayjs";
import { NewsProps } from "@/src/common/types";
import { MarkdownText } from "../MarkdownText/MarkdownText";

export function Article({
  title,
  date,
  innerContent,
}: {
  title: NewsProps['title'],
  date: NewsProps['publishedAt'],
  innerContent: NewsProps['innerContent']
}) {
  return (
    <div
      className="article"
      data-testid="article"
    >
      <span className="article__date">
        {
          dayjs(date)
            .format(`DD.MM.YYYY`)
        }
      </span>
      <h1 className="article__title">{title}</h1>
      <MarkdownText className="article__content">
        {innerContent}
      </MarkdownText>
    </div>
  );
}
