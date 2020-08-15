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
    ).getByText(
      "Exit",
    ),
  ).toBeInTheDocument();
};

export default tradeRowShouldHaveExitButton;
