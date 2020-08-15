import TickerInput from "views/tests/elements/TickerInput";

import componentShouldRender from "./assertions/componentShouldRender";
import render from "./render/SearchView";

it(
  "renders search view",
  () =>
  {
    const handleSearch = jest.fn();

    render(
      {
        handleSearch,
      },
    );

    componentShouldRender(
      TickerInput(),
    );
  },
);
