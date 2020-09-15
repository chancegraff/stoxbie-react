import {
  within,
} from "@testing-library/react";

import {
  TableHistoricalBody,
} from "tests/Components";

export const historicalRowShouldHaveText = (
  row: HTMLElement,
  text: string,
) =>
{
  expect(
    TableHistoricalBody(),
  ).toContainElement(
    row,
  );

  return expect(
    within(
      row,
    ).getByText(
      text,
    ),
  ).toBeInTheDocument();
};
