
export function getDocumentsQueryParams({
  id,
  year,
  pageSize,
}: {
  id: number,
  year: number,
  pageSize: number,
}) {
  return {
    populate: [`files`, `category`],
    filters: {
      category: {
        id: {
          $eq: id,
        },
      },
      createdAt: {
        $gte: `${year - 2}-01-01T00:00:00.000Z`,
        $lte: `${year}-12-31T00:00:00.000Z`,
      },
    },
    pagination: {
      pageSize,
    },
  };
}
