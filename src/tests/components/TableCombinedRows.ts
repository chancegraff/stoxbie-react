import {
  within,
} from "@testing-library/react";

import {
  TableCombinedBody,
} from "tests/Components";

export const TableCombinedRows = () =>
{
  const combinedBody = TableCombinedBody();

  if (!combinedBody)
  {
    return [];
  }

  return within(
    combinedBody,
  ).queryAllByRole(
    "row",
  );
};
