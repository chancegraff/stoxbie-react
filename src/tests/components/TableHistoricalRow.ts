import {
  within,
} from "@testing-library/react";

import {
  TableHistoricalBody,
} from "tests/Components";

export const TableHistoricalRow = (
  values: string[],
) =>
{
  if (!values.length)
  {
    throw new Error(
      "Cannot find historical row without values",
    );
  }

  const historicalBody = TableHistoricalBody();
  const shares = values.shift();

  if (!shares)
  {
    throw new Error(
      "Cannot find historical row without share count",
    );
  }

  const queriedRows = within(
    historicalBody,
  ).queryAllByText(
    `${shares}`,
  );
  const historicalRow = queriedRows.find(
    (
      cell,
    ) =>
    {
      const row = cell.closest(
        "tr",
      );

      if (!row)
      {
        return false;
      }

      return values.every(
        (
          value,
        ) =>
        {
          return within(
            row,
          ).getByText(
            `${value}`,
          );
        },
      );
    },
  );

  if (!historicalRow)
  {
    throw new Error(
      `Couldn't find historical row with strings "${JSON.stringify(
        values,
        null,
        2,
      )}"`,
    );
  }

  return historicalRow;
};
