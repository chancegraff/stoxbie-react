import {
  TickerInput,
} from "utils/Components";

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
