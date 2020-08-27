import TradeSlider from "views/tests/elements/TradeSlider";

const sliderShouldChange = (
  count,
) =>
{
  return expect(
    TradeSlider(),
  ).toHaveAttribute(
    "value",
    count,
  );
};

export default sliderShouldChange;
