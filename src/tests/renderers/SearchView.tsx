import React from "react";
import {
  render,
} from "@testing-library/react";

import Boilerplate from "tests/Boilerplate";
import SearchView from "views/SearchView";

/**
 * @todo Mock iex SDK for search method found in views/SearchView
 */

export const renderSearchView = () =>
{
  return render(
    <Boilerplate
      path="/"
      route="/"
    >
      <SearchView />
    </Boilerplate>,
  );
};
