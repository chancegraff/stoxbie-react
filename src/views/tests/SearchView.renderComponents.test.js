import TickerInput from "views/tests/elements/TickerInput";

import {
  componentShouldRender,
} from "./assertions/componentShouldRender";
import {
  renderSearchView,
} from "./helpers/render";

it(
  "renders search view",
  () =>
  {
    const handleSearch = jest.fn();

    renderSearchView(
      {
        handleSearch,
      },
    );

    componentShouldRender(
      TickerInput(),
    );
  },
);
