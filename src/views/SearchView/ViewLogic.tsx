import React, {
  useEffect,
  useState,
} from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Search,
} from "@chancey/iex-cloud";
import {
  AsyncStates,
} from "async-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  useDebouncedCallback,
} from "use-debounce";

import {
  DEBOUNCE_MEDIUM_MS,
} from "utils/Constants";
import {
  useScrollToTop,
} from "utils/Hooks";
import {
  handleUnloadCreator,
} from "utils/Utilities";

import ViewDisplay from "./ViewDisplay";

type Props = RouteProps & {
  handleSearch: (nextValue: string) => Promise<Search[]>;
};

const ViewLogic: React.FC<Props> = (
  {
    handleSearch,
  },
) =>
{
  const [
    searchResults,
    setSearchResults,
  ] = useState<Search[]>(
    [],
  );
  const [
    searchState,
    setSearchState,
  ] = useState<AsyncStates>(
    "idling",
  );

  const [
    handleSearchLazily,
  ] = useDebouncedCallback(
    async (
      nextValue: string,
    ) =>
    {
      setSearchState(
        "loading",
      );

      const options = await handleSearch(
        nextValue,
      );

      setSearchResults(
        options,
      );
      setSearchState(
        "idling",
      );
    },
    DEBOUNCE_MEDIUM_MS,
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setSearchResults,
          setSearchState,
        ],
      );
    },
    [],
  );

  useScrollToTop();

  return (
    <ViewDisplay
      handleSearch={handleSearchLazily}
      searchState={searchState}
      searchResults={searchResults}
    />
  );
};

export default ViewLogic;
