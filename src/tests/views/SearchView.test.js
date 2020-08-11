import React from "react";
import {
  fireEvent,
  screen,
} from "@testing-library/react";

import {
  renderWithBoilerplate,
} from "tests/utils/renderWithBoilerplate";
import SearchView from "views/SearchView";

const handleSearch = jest.fn();

it(
  "renders search view",
  () =>
  {
    renderWithBoilerplate(
      <SearchView handleSearch={handleSearch} />,
    );

    expect(
      screen.getByRole(
        "combobox",
      ),
    ).toBeInTheDocument();
  },
);

it(
  "types into the input",
  () =>
  {
    renderWithBoilerplate(
      <SearchView handleSearch={handleSearch} />,
    );

    fireEvent.change(
      screen.getByRole(
        "combobox",
      ),
      {
        target: {
          value: "netflix",
        },
      },
    );

    expect(
      handleSearch,
    ).toBeCalledWith(
      "netflix",
      expect.any(
        Function,
      ),
      expect.any(
        Function,
      ),
    );
  },
);
