import {
  waitFor,
} from "@testing-library/react";

import {
  sliderShouldChange,
} from "./assertions";
import {
  changeSlider,
} from "./events";
import {
  renderView,
} from "./render";

it(
  "changes share slider",
  async () =>
  {
    const shareCount = 200;

    renderView();

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
