import {
  within,
} from "@testing-library/react";

import {
  TableCombinedBody,
} from "tests/Components";

export const TableCombinedRow = (
  value: string,
) =>
{
  const combinedBody = TableCombinedBody();

  if (!combinedBody)
  {
    return undefined;
  }

  return within(
    combinedBody,
  )
    .getByText(
      value,
    )
    .closest(
      "tr",
    );
};
