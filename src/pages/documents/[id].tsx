import { DocumentListResponse, DocumentsCategoryListResponse } from "@/src/common/api-types";
import { MOCK_DOCUMENTS_CATEGORIES } from "@/src/common/mocks/collections-mock/documents-categories-collection-mock";
import { MOCK_DOCUMENTS } from "@/src/common/mocks/collections-mock/documents-collection-mock";
import { DocumentsCategoriesProps, DocumentsProps } from "@/src/common/types";
import { getDocumentsQueryParams } from "@/src/common/utils/getDocumentsQueryParams";
import { api } from "@/src/common/utils/HttpClient";
import { DocumentsList } from "@/src/components/documents-page/DocumentsList/DocumentsList";
import { NotFound } from "@/src/components/not-found-page/NotFound/NotFound";
import dayjs from "dayjs";
import Head from "next/head";
import qs from "qs";

export default function DocumentsCategories({
  category,
  documents,
}: {
  category: DocumentsCategoriesProps,
  documents: DocumentsProps[],
}) {
  if (!category) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Сайт зоопарка"
        />
        <title>{category.title}</title>
      </Head>
      <DocumentsList
        categoryTitle={category.title}
        documents={documents}
      />
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
    return {
      props: {
        category: MOCK_DOCUMENTS_CATEGORIES.find(({
          id,
        }) => id === +query.id) || null,
        documents: MOCK_DOCUMENTS.filter(({
          category,
        }) => category.id === +query.id),
      },
    };
  }

  const categoryQueryParams = {
    filters: {
      id: {
        $eq: query.id,
      },
    },
  };

  try {
    const categoryResponse: DocumentsCategoryListResponse = await api.get(`/documents-categories?${qs.stringify(categoryQueryParams)}`);

    const year = dayjs()
      .year();

    const documentsResponse: DocumentListResponse = await api.get(`/documents?${qs.stringify(getDocumentsQueryParams({
      id: +query.id,
      year,
      pageSize: 100,
    }))}`);

    const documents: DocumentsProps[] = documentsResponse.data!
      .map((documentsItem) => ({
        id: documentsItem.id!,
        date: documentsItem.attributes!.publishedAt!,
        showDate: documentsItem.attributes!.showDate!,
        title: documentsItem.attributes!.title!,
        subtitle: documentsItem.attributes!.subtitle,
        description: documentsItem.attributes!.description,
        files: documentsItem.attributes!.files!.data!.map((file) => ({
          id: file.id!,
          name: file.attributes!.name!,
          url: file.attributes!.url!,
          ext: file.attributes!.ext!,
        })),
        category: {
          id: documentsItem.attributes!.category!.data!.id!,
        },
      }));

    return {
      props: {
        category: {
          id: categoryResponse.data![0].id,
          title: categoryResponse.data![0].attributes!.title,
        },
        documents,
      },
    };
  } catch {
    return {
      props: {
        category: null,
      },
    };
  }
}
