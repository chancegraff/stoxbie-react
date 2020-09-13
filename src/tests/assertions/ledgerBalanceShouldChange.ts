import {
  within,
} from "@testing-library/react";

import {
  TableFooter,
} from "tests/Components";

export const ledgerBalanceShouldChange = (
  balance: string,
) =>
{
  const tableFooter = TableFooter();

  return expect(
    within(
      tableFooter,
    ).getByText(
      balance,
    ),
  ).toBeInTheDocument();
};
