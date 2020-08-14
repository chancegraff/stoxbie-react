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

    await waitFor(
      () =>
      {
        return sliderShouldChange(
          "0",
        );
      },
    );

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
