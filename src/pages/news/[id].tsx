import qs from 'qs';
import { MOCK_NEWS } from "@/src/common/mocks/collections-mock/news-collection-mock";
import { api } from "@/src/common/utils/HttpClient";
import { Article } from "@/src/components/globals/Article/Article";
import { NotFound } from "@/src/components/not-found-page/NotFound/NotFound";
import Head from "next/head";
import { NewsCollectionListResponse, NewsCollectionListResponseDataItem } from '@/src/common/api-types';
import { NewsSlider } from '@/src/components/news-page/NewsArticle/components/NewsSlider/NewsSlider';
import { ArticleProps } from '@/src/common/types';

const NEWS_SLIDER_LIMIT = 4;

type SingleNewsProps = Pick<ArticleProps, 'innerContent' | 'publishedAt' | 'title'>;
type OtherNewsProps = Pick<ArticleProps, 'id' | 'description' | 'title'>[];

export default function News({
  news,
  otherNews,
}: {
  news: SingleNewsProps
  otherNews: OtherNewsProps
}) {
  if (!news) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Сайт зоопарка"
        />
        <title>{news.title}</title>
      </Head>
      <Article
        title={news.title}
        date={news.publishedAt}
        innerContent={news.innerContent}
        isFirstBlock={false}
        isLastBlock={false}
        className="article--news"
      />
      {otherNews.length > 0 && <NewsSlider news={otherNews} />}
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: {
    id: string
  }
}) {
  if (process.env.APP_ENV === `static`) {
    const otherNews = MOCK_NEWS.filter((news) => news.id !== +query.id)
      .map((news) => ({
        id: news.id,
        title: news.title,
        description: news.description || null,
      }))
      .slice(0, NEWS_SLIDER_LIMIT);

    return {
      props: {
        news: MOCK_NEWS.find(({
          id,
        }) => id === +query.id) || null,
        otherNews,
      },
    };
  }

  const newsQueryParams = {
    fields: [
      `title`,
      `innerContent`,
      `publishedAt`,
    ],
  };

  const otherNewsQueryParams = {
    fields: [`title`, `description`],
    sort: {
      publishedAt: `desc`,
    },
    filters: {
      id: {
        $ne: query.id,
      },
    },
    pagination: {
      pageSize: NEWS_SLIDER_LIMIT,
    },
  };

  try {
    const newsResponse = await api.get<NewsCollectionListResponseDataItem>(`/news/${query.id}?${qs.stringify(newsQueryParams)}`);

    const news: SingleNewsProps = {
      title: newsResponse.data.attributes!.title!,
      innerContent: newsResponse.data.attributes!.innerContent!,
      publishedAt: newsResponse.data.attributes?.publishedAt,
    };

    const otherNewsResponse: NewsCollectionListResponse = await api.get(`/news?${qs.stringify(otherNewsQueryParams)}`);

    const otherNews: OtherNewsProps = otherNewsResponse.data!.map((otherNewsItem) => ({
      id: otherNewsItem.id!,
      title: otherNewsItem?.attributes!.title,
      description: otherNewsItem?.attributes?.description,
    }));

    return {
      props: {
        news,
        otherNews,
      },
    };
  } catch {
    return {
      props: {
        news: null,
      },
    };
  }
}
