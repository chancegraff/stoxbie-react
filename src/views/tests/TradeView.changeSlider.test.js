import {
  waitFor,
} from "@testing-library/react";

import sliderShouldChange from "./assertions/sliderShouldChange";
import changeSlider from "./events/changeSlider";
import render from "./render/TradeView";

it(
  "changes share slider",
  async () =>
  {
    const shareCount = 200;

    render();

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
