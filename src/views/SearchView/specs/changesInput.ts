import * as iex from "@chancey/iex-cloud";
import {
  waitFor,
} from "@testing-library/react";

import {
  searchInputShouldChange,
  searchResultsShouldHaveLength,
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

jest.mock(
  "@chancey/iex-cloud",
);

it(
  "types into the input",
  async () =>
  {
    const mockSearch = jest.spyOn(
      iex,
      "search",
    );

    mockSearch.mockResolvedValue(
      [
        {
          symbol: "NFLX", securityName: "ItlNeif,. ncx", securityType: "CS", region: "US", exchange: "SNA",
        },
        {
          symbol: "NFC-GY", securityName: ".,n IeilcNfxt", securityType: "CE", region: "DE", exchange: "TER",
        },
        {
          symbol: "NFLX-MM", securityName: " cIeNf.itxl,n", securityType: "CE", region: "MX", exchange: "MXE",
        },
      ],
    );

    renderSearchView();

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
        return searchResultsShouldHaveLength(
          3,
        );
      },
    );
  },
);
