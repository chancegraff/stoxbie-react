import {
  within,
} from "@testing-library/react";

import {
  TableFooter,
} from "utils/Components";

export const ledgerChangeShouldChange = (
  changePercent: string,
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
