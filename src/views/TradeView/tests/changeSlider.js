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
  renderView,
} from "./helpers/render";

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
