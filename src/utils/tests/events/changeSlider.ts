import {
  fireEvent,
} from "@testing-library/react";

import {
  TradeSlider,
} from "utils/tests/Components";

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
