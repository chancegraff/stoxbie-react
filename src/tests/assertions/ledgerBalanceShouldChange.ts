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
  return expect(
    within(
      TableFooter(),
    ).getByText(
      balance,
    ),
  ).toBeInTheDocument();
};
