
export function getDocumentsQueryParams({
  id,
  yearLte,
  yearGte,
  pageSize = 1000,
}: {
  id: number,
  yearLte?: number,
  yearGte?: number,
  pageSize?: number,
}) {
  return {
    populate: [`files`, `category`],
    filters: {
      ...((yearLte || yearGte) && {
        date: {
          $lte: `${yearLte}-12-31`,
          $gte: `${yearGte}-01-01`,
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
