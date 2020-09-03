import {
  waitFor,
} from "@testing-library/react";

import {
  sliderShouldChange,
} from "utils/Assertions";
import {
  changeSlider,
} from "utils/Events";
import {
  renderTradeView,
} from "utils/Renderers";

it(
  "changes share slider",
  async () =>
  {
    const shareCount = "200";

    renderTradeView();

    changeSlider(
      shareCount,
    );

    await waitFor(
      () =>
      {
        return sliderShouldChange(
          shareCount,
        );
      },
    );
  },
);
