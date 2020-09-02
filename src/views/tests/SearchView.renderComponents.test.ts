import {
  componentShouldRender,
} from "utils/tests/Assertions";
import {
  TickerInput,
} from "utils/tests/Components";
import {
  renderSearchView,
} from "utils/tests/Renderers";

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
