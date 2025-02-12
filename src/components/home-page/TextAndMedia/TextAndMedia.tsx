import { TextAndMediaComponentProps } from "@/src/common/types";
import { MarkdownText } from "@/src/components/globals/MarkdownText/MarkdownText";
import { Video } from "@/src/components/globals/Video/Video";
import Image from "next/image";

export function TextAndMedia({
  title,
  description,
  media,
}: Omit<TextAndMediaComponentProps, 'id' | '__component'>) {
  return (
    <section
      className="text-and-media container"
      data-testid="text-and-media"
    >
      <div className="text-and-media__text">
        <MarkdownText className="text-and-media__title">{title}</MarkdownText>
        <p className="text-and-media__description">{description}</p>
      </div>
      {media.mime.startsWith(`video`) && (
        <Video
          className="text-and-media__video"
          dataTestid="text-and-media-video"
          title={media.alternativeText}
          sources={
            {
              src: media.url,
              type: media.mime,
            }
          }
          options={{
            loop: {
              active: true,
            },
            muted: true,
            controls: [],
            autoplay: process.env.APP_ENV !== `static`,
            fullscreen: {
              enabled: false,
            },
          }}
        />
      )}
      {media.mime.startsWith(`image`) && (
        <Image
          src={media.url}
          alt={media.alternativeText}
        />
      )}
    </section>
  );
}
