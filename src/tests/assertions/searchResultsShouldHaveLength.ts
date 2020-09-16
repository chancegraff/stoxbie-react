import {
  SearchResults,
} from "tests/Components";

export const searchResultsShouldHaveLength = (
  length: number,
) =>
{
  return expect(
    SearchResults(),
  ).toHaveLength(
    length,
  );
};
