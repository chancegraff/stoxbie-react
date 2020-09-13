import {
  within,
} from "@testing-library/react";

export const presentRowShouldHaveCloseButton = (
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
