import React from "react";
import {
  render,
} from "@testing-library/react";

import {
  Boilerplate,
} from "utils/Tests";
import SearchView from "views/SearchView";

export const renderSearchView = (
  handleSearch: any,
) =>
{
  return render(
    <Boilerplate
      path="/"
      route="/"
    >
      <SearchView handleSearch={handleSearch} />
    </Boilerplate>,
  );
};
