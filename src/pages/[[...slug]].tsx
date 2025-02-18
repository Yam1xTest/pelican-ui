import Head from 'next/head';
import { getMockPageData } from '@/src/common/utils/getMockPageData';
import { useRouter } from 'next/router';
import { ContactZooPageProps, GlobalComponentProps, HomePageProps } from '../common/types';
import { NotFound } from '../components/not-found-page/NotFound/NotFound';
import { BlockRenderer } from '../components/globals/BlockRenderer/BlockRenderer';
import { getPageData } from '../common/utils/getPageData';

type UniversalProps = {
  globalData: GlobalComponentProps,
  pageData: HomePageProps | ContactZooPageProps,
};

export default function UniversalPage({
  globalData,
  pageData,
}: UniversalProps) {
  const route = useRouter();

  if (!pageData) {
    return <NotFound />;
  }

  const {
    email,
  } = globalData;

  const {
    seo,
    blocks,
  } = pageData;

  return (
    <>
      <Head>
        <title>{seo?.metaTitle}</title>
        <meta
          name={seo?.metaDescription}
          content="Сайт зоопарка"
        />
      </Head>
      {blocks.map((block) => (
        <BlockRenderer
          slug={route.asPath}
          key={block.id}
          block={block}
          email={email}
        />
      ))}
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: {
    slug: string,
  },
}) {
  let pageData;
  if (process.env.APP_ENV === `static`) {
    pageData = getMockPageData({
      slug: query.slug,
    });

    setBlockPosition({
      slug: query.slug,
      blocks: pageData.blocks,
    });

    return {
      props: {
        pageData,
      },
    };
  }

  try {
    pageData = await getPageData({
      slug: query.slug,
    });

    setBlockPosition({
      slug: query.slug,
      blocks: pageData.blocks,
    });

    return {
      props: {
        pageData,
      },
    };
  } catch {
    return {
      props: {
        pageData: null,
      },
    };
  }
}

function setBlockPosition({
  slug,
  blocks,
}: {
  slug: string;
  blocks: any
}) {
  if (slug && blocks.length) {
    blocks[0].isFirstBlock = true;
    blocks[blocks.length - 1].isLastBlock = true;
  }
}
