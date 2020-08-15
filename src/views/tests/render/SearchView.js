import React from "react";
import {
  render,
} from "@testing-library/react";

import Boilerplate from "utils/tests/Boilerplate";
import SearchView from "views/SearchView";

const renderSearchView = (
  props,
) =>
{
  return render(
    <Boilerplate>
      <SearchView {...props} />
    </Boilerplate>,
  );
};

export default renderSearchView;
