import {
  waitFor,
} from "@testing-library/react";

import sliderShouldChange from "./assertions/sliderShouldChange";
import changeSlider from "./events/changeSlider";
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
