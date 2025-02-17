import Head from 'next/head';
import { NotFound } from '@/src/components/not-found-page/NotFound/NotFound';
import { MOCK_DOCUMENTS_PAGE } from '@/src/common/mocks/documents-page-mock/documents-page-mock';
import { api } from '@/src/common/utils/HttpClient';
import { DocumentListResponse, DocumentsCategoryListResponse } from '@/src/common/api-types';
import qs from 'qs';
import { Categories } from '@/src/components/documents-page/Categories/Categories';
import { MOCK_DOCUMENTS_CATEGORIES } from '@/src/common/mocks/collections-mock/documents-categories-collection-mock';
import { DocumentsCategoriesProps, DocumentsPageProps } from '@/src/common/types';
import { getDocumentsQueryParams } from '@/src/common/utils/getDocumentsQueryParams';
import { MOCK_DOCUMENTS } from '@/src/common/mocks/collections-mock/documents-collection-mock';
import dayjs from 'dayjs';

export default function DocumentsPage({
  pageData,
  documentCategories,
}: {
  pageData: DocumentsPageProps,
  documentCategories: DocumentsCategoriesProps[],
}) {
  if (!pageData || !documentCategories) {
    return <NotFound />;
  }

  const {
    title,
    documentsTitle,
  } = pageData;

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Сайт зоопарка"
        />
        <title>{title}</title>
      </Head>
      <Categories
        documentsTitle={documentsTitle}
        documentsCategories={documentCategories}
      />
    </>
  );
}

export async function getServerSideProps() {
  const currentYear = dayjs()
    .year();

  if (process.env.APP_ENV === `static`) {
    const documentsCategories = MOCK_DOCUMENTS_CATEGORIES.filter(({
      id,
      hasTabs,
    }) => {
      for (let i = 0; i < 3; i++) {
        const year = currentYear - i;
        const documents = MOCK_DOCUMENTS.filter(({
          date,
          category,
        }) => {
          const isCategory = category.id === id;
          const isYear = date.split(`-`)[0] === String(year);

          if (isCategory && !hasTabs) {
            return isCategory;
          }

          return isCategory && isYear;
        });

        if (documents.length) {
          return true;
        }
      }

      return false;
    });

    return {
      props: {
        pageData: MOCK_DOCUMENTS_PAGE,
        documentCategories: documentsCategories,
      },
    };
  }

  try {
    const documentsCategoriesResponse: DocumentsCategoryListResponse = await api.get(`/documents-categories`);

    const documentsCategories: DocumentsCategoriesProps[] = (await Promise.all(
      documentsCategoriesResponse.data!
        .map(async (documentsCategoriesItem) => {
          const documentsResponse: DocumentListResponse = await api.get(`/documents?${qs.stringify(getDocumentsQueryParams({
            id: documentsCategoriesItem.id!,
            ...((documentsCategoriesItem.attributes?.hasTabs) && {
              yearLessThanOrEqual: currentYear,
              yearGreaterThanOrEqual: currentYear - 2,
            }),
            pageSize: 1,
          }))}`);

          if (documentsResponse.meta?.pagination?.total) {
            return ({
              id: documentsCategoriesItem.id!,
              title: documentsCategoriesItem.attributes!.title,
            });
          }
          return null;
        }),
    )).filter((item): item is DocumentsCategoriesProps => item !== null);

    return {
      props: {
        pageData: MOCK_DOCUMENTS_PAGE,
        documentCategories: documentsCategories,
      },
    };
  } catch {
    return {
      props: {
        documentCategories: null,
      },
    };
  }
}
