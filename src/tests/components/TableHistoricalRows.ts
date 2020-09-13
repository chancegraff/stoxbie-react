import {
  within,
} from "@testing-library/react";

import {
  TableHistoricalBody,
} from "tests/Components";

export const TableHistoricalRows = () =>
{
  const historicalBody = TableHistoricalBody();

  if (!historicalBody)
  {
    return [];
  }

  return within(
    historicalBody,
  ).queryAllByRole(
    "row",
  );
};
