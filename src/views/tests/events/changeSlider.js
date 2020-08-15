import {
  fireEvent,
} from "@testing-library/react";

import TradeSliderInput from "views/tests/elements/TradeSliderInput";

const changeSlider = (
  value,
) =>
{
  fireEvent.change(
    TradeSliderInput(),
    {
      target: {
        value,
      },
    },
  );
};

export default changeSlider;
