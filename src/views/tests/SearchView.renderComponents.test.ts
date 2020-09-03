import {
  componentShouldRender,
} from "utils/Assertions";
import {
  TickerInput,
} from "utils/Components";
import {
  renderSearchView,
} from "utils/Renderers";

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
