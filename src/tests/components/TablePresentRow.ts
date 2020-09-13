import {
  within,
} from "@testing-library/react";

import {
  TablePresentBody,
} from "tests/Components";

export const TablePresentRow = () =>
{
  const [
    presentRow,
  ] = within(
    TablePresentBody(),
  ).getAllByRole(
    "row",
  );

  return presentRow;
};
