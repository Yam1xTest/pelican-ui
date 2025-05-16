import { expect, test } from '@playwright/test';
import { getLastMondayOfMonth } from './getDateOfLastMonday';

type MonthUnitType = {
  monthNumber: number;
  result: string;
};

const monthArray: MonthUnitType[] = [
  {
    monthNumber: 0,
    result: `27 января зоопарк не работает`,
  },
  {
    monthNumber: 1,
    result: `24 февраля зоопарк не работает`,
  },
  {
    monthNumber: 2,
    result: `31 марта зоопарк не работает`,
  },
  {
    monthNumber: 3,
    result: `28 апреля зоопарк не работает`,
  },
  {
    monthNumber: 4,
    result: `26 мая зоопарк не работает`,
  },
  {
    monthNumber: 5,
    result: `30 июня зоопарк не работает`,
  },
  {
    monthNumber: 6,
    result: `28 июля зоопарк не работает`,
  },
  {
    monthNumber: 7,
    result: `25 августа зоопарк не работает`,
  },
  {
    monthNumber: 8,
    result: `29 сентября зоопарк не работает`,
  },
  {
    monthNumber: 9,
    result: `27 октября зоопарк не работает`,
  },
  {
    monthNumber: 10,
    result: `24 ноября зоопарк не работает`,
  },
  {
    monthNumber: 11,
    result: `29 декабря зоопарк не работает`,
  },
];

test.describe(`getDateOfLastMondayTests`, () => {
  test(`JanuaryMonthTest`, () => {
    universalMonthCheck(0);
  });
});

async function universalMonthCheck({
  index,
}: {
  index: number;
}) {
  await expect(getLastMondayOfMonth({
    year: 2025,
    month: monthArray[index].monthNumber,
  }))
    .toBe(monthArray[index].result);
}
