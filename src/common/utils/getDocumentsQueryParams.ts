export function getDocumentsQueryParams({
  id,
  yearLessThanOrEqual,
  yearGreaterThanOrEqual,
  pageSize = 100,
}: {
  id: number,
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
        id: {
          $eq: id,
        },
      },
    },
    pagination: {
      pageSize,
    },
  };
}
