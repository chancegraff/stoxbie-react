import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Search,
} from "@chancey/iex-cloud";

import SearchViewLogic from "./SearchView/SearchViewLogic";

type Props = RouteProps & {
  handleSearch: (nextValue: string) => Promise<Search[]>;
};

const SearchView: React.FC<Props> = (
  {
    handleSearch,
  },
) =>
{
  return (
    <SearchViewLogic
      handleSearch={handleSearch}
    />
  );
};

export default SearchView;
