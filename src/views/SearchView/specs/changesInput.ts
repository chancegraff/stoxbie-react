import {
  waitFor,
} from "@testing-library/react";

import {
  mockShouldChange,
  searchInputShouldChange,
} from "tests/Assertions";
import {
  TickerInput,
} from "tests/Components";
import {
  changeInput,
} from "tests/Events";
import {
  renderSearchView,
} from "tests/Renderers";

const SEARCH_INPUT_VALUE = "netflix";

it(
  "types into the input",
  async () =>
  {
    const handleSearch = jest.fn();

    renderSearchView(
      handleSearch,
    );

    changeInput(
      TickerInput(),
      SEARCH_INPUT_VALUE,
    );

    await waitFor(
      () =>
      {
        return searchInputShouldChange(
          SEARCH_INPUT_VALUE,
        );
      },
    );

    await waitFor(
      () =>
      {
        return mockShouldChange(
          handleSearch,
          [
            SEARCH_INPUT_VALUE,
          ],
        );
      },
      {
        timeout: 1500,
      },
    );
  },
);
