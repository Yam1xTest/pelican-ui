/* eslint-disable no-nested-ternary */
export function getLastMondayOfMonth(year: number, month: number): string {
  const namesOfMonths = [
    `января`,
    `февраля`,
    `марта`,
    `апреля`,
    `мая`,
    `июня`,
    `июля`,
    `августа`,
    `сентября`,
    `октября`,
    `августа`,
    `сентября`,
    `октября`,
    `ноября`,
    `декабря`,
  ];

  const lastDay = new Date(year, month + 1, 0);
  const dayOfWeek = lastDay.getDay();
  const offset = dayOfWeek === 1 ? 0 : (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);

  return `${lastDay.getDate() + offset} ${namesOfMonths[month]} зоопарк не работает`;
}
