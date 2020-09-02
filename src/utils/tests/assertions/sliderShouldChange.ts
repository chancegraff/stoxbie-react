import {
  TradeSlider,
} from "utils/tests/Components";

export const sliderShouldChange = (
  count: string,
) =>
{
  return expect(
    TradeSlider(),
  ).toHaveAttribute(
    "value",
    count,
  );
};
