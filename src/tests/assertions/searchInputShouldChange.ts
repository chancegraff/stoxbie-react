import {
  TickerInput,
} from "tests/Components";

export const searchInputShouldChange = (
  value: string,
) =>
{
  return expect(
    TickerInput(),
  ).toHaveAttribute(
    "value",
    value,
  );
};
