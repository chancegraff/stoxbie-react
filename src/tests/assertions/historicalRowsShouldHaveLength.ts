export const historicalRowsShouldHaveLength = (
  rows: HTMLElement[],
  length: number,
) =>
{
  return expect(
    rows,
  ).toHaveLength(
    length,
  );
};
