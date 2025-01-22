import { DocumentsCategoriesQuery, DocumentsQuery } from "@/src/common/types";

export function getDocumentsCategoriesQueryParams({
  id,
  year,
  pageSize,
}: {
  id: number,
  year: number,
  pageSize: number,
})
  : DocumentsCategoriesQuery {
  return {
    populate: [`files`, `category`],
    filters: {
      category: {
        id: {
          $eq: id,
        },
      },
      publishedAt: {
        $gte: `${year - 2}-01-01T00:00:00.000Z`,
        $lte: `${year}-12-31T00:00:00.000Z`,
      },
    },
    pagination: {
      pageSize,
    },
  };
}

export function getDocumentsQueryParams({
  id,
  year,
  pageSize,
}: {
  id: number,
  year: string,
  pageSize: number,
}): DocumentsQuery {
  return {
    populate: [`files`, `category`],
    filters: {
      category: {
        id: {
          $eq: id,
        },
      },
      date: {
        $lte: `${year}-12-31`,
        $gte: `${year}-01-01`,
      },
    },
    pagination: {
      pageSize,
    },
  };
}
