import {
  waitFor,
} from "@testing-library/react";

import {
  sliderShouldChange,
} from "./helpers/assertions";
import {
  changeSlider,
} from "./helpers/events";
import {
  renderTradeView,
} from "./helpers/render";

it(
  "changes share slider",
  async () =>
  {
    const shareCount = 200;

    renderTradeView();

    changeSlider(
      shareCount,
    );

    await waitFor(
      () =>
      {
        return sliderShouldChange(
          `${shareCount}`,
        );
      },
    );
  },
);
