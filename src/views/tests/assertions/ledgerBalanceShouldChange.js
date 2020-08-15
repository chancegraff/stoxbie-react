import {
  within,
} from "@testing-library/react";

import TableFooter from "views/tests/elements/TableFooter";

const ledgerBalanceShouldChange = (
  balance,
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

export default ledgerBalanceShouldChange;
