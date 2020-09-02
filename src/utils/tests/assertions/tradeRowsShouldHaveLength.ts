export const tradeRowsShouldHaveLength = (
  tradeRows: Array<any>,
  length: number,
) =>
{
  return expect(
    tradeRows,
  ).toHaveLength(
    length,
  );
};
