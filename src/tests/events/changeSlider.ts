import {
  fireEvent,
} from "@testing-library/react";

import {
  TradeSlider,
} from "tests/Components";

export const changeSlider = (
  value: string,
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
