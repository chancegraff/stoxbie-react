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

  const combinedRow = within(
    combinedBody,
  )
    .getByText(
      value,
    )
    .closest(
      "tr",
    );

  if (!combinedRow)
  {
    throw new Error(
      `Couldn't find combined row with string "${value}"`,
    );
  }

  return combinedRow;
};
