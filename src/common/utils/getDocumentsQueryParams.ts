export function getDocumentsQueryParams({
  documentId,
  yearLessThanOrEqual,
  yearGreaterThanOrEqual,
  pageSize = 100,
}: {
  documentId: string,
  yearLessThanOrEqual?: number,
  yearGreaterThanOrEqual?: number,
  pageSize?: number,
}) {
  return {
    populate: [`files`, `category`],
    filters: {
      ...((yearLessThanOrEqual || yearGreaterThanOrEqual) && {
        date: {
          $lte: `${yearLessThanOrEqual}-12-31`,
          $gte: `${yearGreaterThanOrEqual}-01-01`,
        },
      }),
      category: {
        documentId: {
          $eq: documentId,
        },
      },
    },
    pagination: {
      pageSize,
    },
  };
}
