import { DocumentsQuery } from "../types";

export function getDocumentsQueryParams(_id: number, _year: number, _pageSize: number)
  : DocumentsQuery {
  return {
    populate: [`files`, `category`],
    filters: {
      category: {
        id: {
          $eq: _id,
        },
      },
      createdAt: {
        $gte: `${_year - 2}-01-01T00:00:00.000Z`,
        $lte: `${_year}-12-31T00:00:00.000Z`,
      },
    },
    pagination: {
      pageSize: _pageSize,
    },
  };
}
