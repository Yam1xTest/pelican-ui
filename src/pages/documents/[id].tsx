import { DocumentListResponse, DocumentsCategoryListResponse } from "@/src/common/api-types";
import { DOCUMENTS_CATEGORIES, DocumentsCategoriesProps } from "@/src/common/mocks/documents-page-mock/documents-categories-mock";
import { DOCUMENTS_LIST, DocumentsListComponentProps } from "@/src/common/mocks/documents-page-mock/documents-list-mock";
import { getDocumentsQueryParams } from "@/src/common/utils/getDocumentsQueryParams";
import { api } from "@/src/common/utils/HttpClient";
import { DocumentsList } from "@/src/components/documents-page/DocumentsList/DocumentsList";
import { NotFound } from "@/src/components/not-found-page/NotFound/NotFound";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useRef } from "react";

export default function DocumentsCategories({
  category,
  queryYear,
  availableYears,
  documents,
}: {
  category: DocumentsCategoriesProps,
  queryYear: string,
  availableYears: number[],
  documents: DocumentsListComponentProps[],
}) {
  const tabsRef = useRef<{
    setIsActiveIndex:(index: number) => void
  }>(null);

  const router = useRouter();

  useEffect(() => {
    if (queryYear) {
      router.push(
        {
          query: {
            ...router.query,
            year: queryYear,
          },
        },
      );
    }

    if (tabsRef.current) {
      tabsRef.current.setIsActiveIndex(availableYears.indexOf(+queryYear));
    }
  }, []);

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
        availableYears={availableYears}
        documents={documents}
        tabsRef={tabsRef}
      />
    </>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: {
    id: string,
    year: string,
  }
}) {
  if (process.env.APP_ENV === `static`) {
    return {
      props: {
        category: DOCUMENTS_CATEGORIES.find(({
          id,
        }) => id === +query.id) || null,
        documents: DOCUMENTS_LIST.filter(({
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

    const currentYear = dayjs()
      .year();

    const availableYears: number[] = [];

    await Promise.all(
      Array.from({
        length: 3,
      })
        .map(async (_, i) => {
          const year = currentYear - i;
          const yearsResponse: DocumentListResponse = await api.get(`/documents?${qs.stringify(getDocumentsQueryParams({
            id: +query.id,
            year: `${year}`,
            pageSize: 1,
          }))}`);

          if (yearsResponse.meta?.pagination?.total) {
            availableYears.push(year);
          }
        }),
    );

    availableYears.sort((a: number, b:number) => b - a);

    const lastYear = String(availableYears[0]);

    if (query.year && !availableYears.includes(+(query.year))) {
      return {
        props: {
          category: null,
        },
      };
    }

    const documentsResponse: DocumentListResponse = await api.get(`/documents?${qs.stringify(getDocumentsQueryParams({
      id: +query.id,
      year: query.year || lastYear,
      pageSize: 100,
    }))}`);

    const documents: DocumentsListComponentProps[] = documentsResponse.data!
      .map((documentsItem) => ({
        id: documentsItem.id!,
        date: documentsItem.attributes!.date!,
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
        queryYear: query.year || lastYear,
        availableYears,
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
