import { DocumentsQuery } from "../types";

export function getDocumentsQueryParams({
  id,
  yearsGte,
  yearsLte,
  pageSize,
}: {
  id: number,
  yearsGte: number,
  yearsLte: number,
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
        $gte: `${yearsGte}-01-01`,
        $lte: `${yearsLte}-12-31`,
      },
    },
    pagination: {
      pageSize,
    },
  };
}
