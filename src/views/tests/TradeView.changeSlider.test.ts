import {
  waitFor,
} from "@testing-library/react";

import {
  sliderShouldChange,
} from "utils/tests/Assertions";
import {
  changeSlider,
} from "utils/tests/Events";
import {
  renderTradeView,
} from "utils/tests/Renderers";

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
