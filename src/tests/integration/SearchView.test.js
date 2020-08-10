import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import BaseUI from "services/BaseUI";
import SearchView from "views/SearchView";

it(
  "renders search view and types into the input",
  () =>
  {
    const handleSearch = jest.fn();

    render((
      <BaseUI>
        <SearchView handleSearch={handleSearch} />
      </BaseUI>
    ));

    const tickerInput = screen.getByRole("combobox");

    expect(tickerInput).toBeInTheDocument();

    fireEvent.change(
      tickerInput,
      { target: { value: "netflix" } },
    );

    expect(handleSearch).toBeCalledWith(
      "netflix",
      expect.any(Function),
      expect.any(Function),
    );
  },
);
