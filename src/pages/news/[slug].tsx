import qs from 'qs';
import { MOCK_NEWS } from "@/src/common/mocks/collections-mock/news-collection-mock";
import { api } from "@/src/common/utils/HttpClient";
import { Article } from "@/src/components/globals/Article/Article";
import { NewsCollection, NewsCollectionListResponse } from '@/src/common/api-types';
import { NewsSlider } from '@/src/components/news-page/NewsArticle/components/NewsSlider/NewsSlider';
import { NewsArticleProps } from '@/src/common/types';
import { SeoHead } from '@/src/components/globals/SeoHead/SeoHead';
import { NotFound } from '@/src/components/not-found-page/NotFound/NotFound';
import { useScrollTop } from '@/src/common/hooks/useScrollTop';

const NEWS_SLIDER_LIMIT = 4;

type SelectedNewsProps = Pick<NewsArticleProps, 'innerContent' | 'publishedAt' | 'title' | 'seo'>;
type OtherNewsProps = Pick<NewsArticleProps, 'id' | 'description' | 'title' | 'slug'>[];

export default function News({
  selectedNews,
  otherNews,
}: {
  selectedNews: SelectedNewsProps;
  otherNews: OtherNewsProps;
}) {
  useScrollTop();

  if (!selectedNews) {
    return <NotFound />;
  }

  return (
    <>
      <SeoHead
        metaTitle={selectedNews?.seo?.metaTitle || selectedNews.title}
        metaDescription={selectedNews?.seo?.metaDescription}
        metaKeywords={selectedNews?.seo?.metaKeywords}
      />
      <Article
        title={selectedNews.title}
        date={selectedNews.publishedAt}
        innerContent={selectedNews.innerContent}
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
  preview = false,
}: {
  query: {
    slug: string;
  };
  preview: boolean;
}) {
  if (process.env.APP_ENV === `static`) {
    const otherNews = MOCK_NEWS.filter((news) => news.slug !== query.slug)
      .map((news) => ({
        id: news.id,
        slug: news.slug,
        title: news.title,
        description: news.description || null,
      }))
      .slice(0, NEWS_SLIDER_LIMIT);

    return {
      props: {
        selectedNews: MOCK_NEWS.find(({
          slug,
        }) => slug === query.slug) || null,
        otherNews,
      },
    };
  }

  const selectedNews = await getNews({
    preview,
    slug: query.slug,
  });

  const otherNews = await getOtherNews({
    preview,
    slug: query.slug,
  });

  return {
    props: {
      selectedNews,
      otherNews,
    },
  };
}

async function getNews({
  preview,
  slug,
}: {
  preview: boolean;
  slug: string;
}): Promise<SelectedNewsProps | null> {
  try {
    const queryParams = {
      fields: [
        `title`,
        `innerContent`,
        `publishedAt`,
      ],
      populate: [`seo`],
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: preview ? `draft` : `published`,
    };

    const response: NewsCollectionListResponse = await api.get(`/news?${qs.stringify(queryParams)}`);

    return mapSelectedNews({
      news: response.data![0],
    });
  } catch {
    return null;
  }
}

function mapSelectedNews({
  news,
}: {
  news: NewsCollection;
}) {
  if (!news) return null;

  return {
    title: news.title,
    innerContent: news!.innerContent,
    publishedAt: news!.publishedAt,
    ...(news?.seo && {
      seo: {
        metaTitle: news.seo.metaTitle!,
        metaDescription: news.seo?.metaDescription,
        metaKeywords: news.seo?.keywords,
      },
    }),
  };
}

async function getOtherNews({
  preview,
  slug,
}: {
  preview: boolean;
  slug: string;
}): Promise<OtherNewsProps | []> {
  try {
    const queryParams = {
      fields: [
        `title`,
        `description`,
        `slug`,
      ],
      sort: {
        publishedAt: `desc`,
      },
      filters: {
        slug: {
          $ne: slug,
        },
      },
      pagination: {
        pageSize: NEWS_SLIDER_LIMIT,
      },
      status: preview ? `draft` : `published`,
    };

    const response: NewsCollectionListResponse = await api.get(`/news?${qs.stringify(queryParams)}`);

    return mapOtherNews({
      news: response.data!,
      slug,
    });
  } catch {
    return [];
  }
}

function mapOtherNews({
  news,
  slug,
}: {
  news: NewsCollection[];
  slug: string;
}) {
  if (!news.length) return [];

  return news
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      id: item.id!,
      slug: item.slug!,
      title: item!.title,
      description: item?.description,
    }));
}
