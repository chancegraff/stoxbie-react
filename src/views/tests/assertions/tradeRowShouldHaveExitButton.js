import {
  within,
} from "@testing-library/react";

const tradeRowShouldHaveExitButton = (
  tradeRow,
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

export default tradeRowShouldHaveExitButton;
