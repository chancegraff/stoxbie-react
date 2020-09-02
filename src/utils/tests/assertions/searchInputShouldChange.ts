import {
  TickerInput,
} from "utils/tests/Components";

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
