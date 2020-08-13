import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import Boilerplate from "tests/utils/Boilerplate";
import SearchView from "views/SearchView";

const handleSearch = jest.fn();

it(
  "renders search view",
  () =>
  {
    render(
      <Boilerplate>
        <SearchView handleSearch={handleSearch} />
      </Boilerplate>,
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
    render(
      <Boilerplate>
        <SearchView handleSearch={handleSearch} />
      </Boilerplate>,
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
