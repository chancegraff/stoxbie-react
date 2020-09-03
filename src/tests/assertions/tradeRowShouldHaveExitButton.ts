import {
  within,
} from "@testing-library/react";

export const tradeRowShouldHaveExitButton = (
  tradeRow: any,
) =>
{
  return expect(
    within(
      tradeRow,
    ).getByLabelText(
      "Catalog",
    ),
  ).toBeInTheDocument();
};
