import {
  componentShouldRender,
} from "tests/Assertions";
import {
  TickerInput,
} from "tests/Components";
import {
  renderSearchView,
} from "tests/Renderers";

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
