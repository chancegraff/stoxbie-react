import {
  waitFor,
} from "@testing-library/react";

import {
  pageShouldLoad,
  sliderShouldChange,
} from "tests/Assertions";
import {
  changeSlider,
} from "tests/Events";
import {
  renderTradeView,
} from "tests/Renderers";

it(
  "changes share slider",
  async () =>
  {
    const shareCount = "200";

    renderTradeView();

    await pageShouldLoad();

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
