import { DocumentListResponse, DocumentsCategoryListResponse } from "@/src/common/api-types";
import { MOCK_DOCUMENTS_CATEGORIES } from "@/src/common/mocks/collections-mock/documents-categories-collection-mock";
import { DocumentsTabsComponentProps, MOCK_DOCUMENTS, MOCK_DOCUMENTS_TABS } from "@/src/common/mocks/collections-mock/documents-collection-mock";
import { DocumentsCategoriesProps, DocumentsProps } from "@/src/common/types";
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
  queryYear: DocumentsTabsComponentProps[`queryYear`],
  availableYears: DocumentsTabsComponentProps[`availableYears`],
  documents: DocumentsTabsComponentProps[],
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
    const lastYear = String(MOCK_DOCUMENTS_TABS[0]);

    return {
      props: {
        category: MOCK_DOCUMENTS_CATEGORIES.find(({
          id,
        }) => id === +query.id) || null,
        queryYear: query.year || lastYear,
        availableYears: MOCK_DOCUMENTS_TABS,
        documents: MOCK_DOCUMENTS.filter(({
          date,
          category,
        }) => {
          const isCategory = category.id === +query.id;
          const isYear = date.split(`-`)[0] === (query.year || lastYear);

          return isCategory && isYear;
        }),
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

    if (query.year && !availableYears.includes(+query.year)) {
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

    const documents: DocumentsProps[] = documentsResponse.data!
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
        tabs: {
          queryYear: query.year || lastYear,
          availableYears,
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
