import React, {
  useCallback,
} from "react";
import {
  search,
} from "iex-cloud";

import SearchView from "views/SearchView";

type Props = unknown;

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
