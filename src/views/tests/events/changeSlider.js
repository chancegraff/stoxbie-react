import {
  fireEvent,
} from "@testing-library/react";

import TradeSlider from "../elements/TradeSlider";

const changeSlider = (
  value,
) =>
{
  fireEvent.change(
    TradeSlider(),
    {
      target: {
        value,
      },
    },
  );
};

export default changeSlider;
