import React, {
  useCallback,
} from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  search,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import SearchViewLogic from "./SearchView/SearchViewLogic";

type Props = RouteProps;

const SearchView: React.FC<Props> = () =>
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
    <SearchViewLogic
      handleSearch={handleSearch}
    />
  );
};

export default SearchView;
