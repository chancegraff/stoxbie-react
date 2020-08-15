import TradeSlider from "views/tests/elements/TradeSlider";

const sliderShouldChange = (
  count,
) =>
{
  return expect(
    TradeSlider(),
  ).toHaveAttribute(
    "aria-valuenow",
    count,
  );
};

export default sliderShouldChange;
