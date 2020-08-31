import React, {
  useCallback,
} from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  search,
} from "@chancey/iex-cloud";

import SearchView from "views/SearchView";

type Props = RouteProps;

const SearchRoutes: React.FC<Props> = () =>
{
  const handleSearch = useCallback(
    async (
      nextValue: string,
    ) =>
    {
      const [
        ...options
      ] = await search(
        nextValue,
      );

      return options;
    },
    [],
  );

  return (
    <SearchView handleSearch={handleSearch}/>
  );
};

export default SearchRoutes;
