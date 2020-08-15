import {
  fireEvent,
} from "@testing-library/react";

import {
  TradeSliderInput,
} from "./components";

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
