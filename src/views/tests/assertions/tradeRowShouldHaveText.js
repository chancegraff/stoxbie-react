import {
  within,
} from "@testing-library/react";

const tradeRowShouldHaveText = (
  tradeRow,
  text,
) =>
{
  return expect(
    within(
      tradeRow,
    ).getByText(
      text,
    ),
  ).toBeInTheDocument();
};

export default tradeRowShouldHaveText;
