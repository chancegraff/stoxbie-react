import {
  within,
} from "@testing-library/react";

export const tradeRowShouldHaveText = (
  tradeRow: any,
  text: string,
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
