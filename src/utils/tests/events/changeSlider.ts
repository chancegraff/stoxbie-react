import {
  fireEvent,
} from "@testing-library/react";

import {
  TradeSlider,
} from "utils/Components";

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
