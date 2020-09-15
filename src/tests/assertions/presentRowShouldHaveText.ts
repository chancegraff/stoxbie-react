import {
  within,
} from "@testing-library/react";

import {
  TablePresentBody,
} from "tests/Components";

export const presentRowShouldHaveText = (
  row: HTMLElement,
  text: string,
) =>
{
  expect(
    TablePresentBody(),
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
