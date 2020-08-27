import {
  waitFor,
} from "@testing-library/react";

import mockShouldChange from "views/tests/assertions/mockShouldChange";

import searchInputShouldChange from "./assertions/searchInputShouldChange";
import TickerInput from "./elements/TickerInput";
import changeInput from "./events/changeInput";
import render from "./render/SearchView";

const SEARCH_INPUT_VALUE = "netflix";
const handleSearch = jest.fn();

it(
  "types into the input",
  async () =>
  {
    render(
      {
        handleSearch,
      },
    );

    changeInput(
      TickerInput(),
      SEARCH_INPUT_VALUE,
    );

    searchInputShouldChange(
      SEARCH_INPUT_VALUE,
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
    );
  },
);
