import {
  TradeSlider,
} from "utils/Components";

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
