import {
  within,
} from "@testing-library/react";

import TableFooter from "views/tests/elements/TableFooter";

const ledgerChangeShouldChange = (
  changePercent,
) =>
{
  return expect(
    within(
      TableFooter(),
    ).getByText(
      changePercent,
    ),
  ).toBeInTheDocument();
};

export default ledgerChangeShouldChange;
