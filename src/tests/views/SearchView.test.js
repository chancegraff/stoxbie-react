import React from "react";
import {
  fireEvent,
  screen,
} from "@testing-library/react";

import { renderWithBoilerplate } from "tests/utils/renderWithBoilerplate";
import SearchView from "views/SearchView";

const handleSearch = jest.fn();

it(
  "renders search view and types into the input",
  () =>
  {
    renderWithBoilerplate(<SearchView handleSearch={handleSearch} />);

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
