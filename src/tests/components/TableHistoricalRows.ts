import {
  within,
} from "@testing-library/react";

import {
  TableHistoricalBody,
} from "tests/Components";

export const TableHistoricalRows = () =>
{
  const historicalBody = TableHistoricalBody();

  return within(
    historicalBody,
  ).queryAllByRole(
    "row",
  );
};
