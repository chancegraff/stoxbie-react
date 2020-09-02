import React from "react";
import {
  render,
} from "@testing-library/react";

import {
  Boilerplate,
} from "utils/tests";
import SearchView from "views/SearchView";

export const renderSearchView = (
  props: any,
) =>
{
  return render(
    <Boilerplate
      path="/"
      route="/"
    >
      <SearchView {...props} />
    </Boilerplate>,
  );
};
