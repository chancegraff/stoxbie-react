import {
  sliderShouldChange,
} from "tests/Assertions";
import {
  changeSlider,
  clickOrder,
} from "tests/Events";

export const buyShares = (
  trade: any,
) =>
{
  changeSlider(
    trade.OpenCount,
  );

  sliderShouldChange(
    `${trade.OpenCount}`,
  );

  clickOrder();

  sliderShouldChange(
    "0",
  );
};
