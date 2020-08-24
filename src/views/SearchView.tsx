import React, {
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  AsyncStates,
} from "async-types";
import {
  Box,
  Heading,
  Text,
} from "grommet";
import {
  Search,
} from "iex-cloud";
import {
  useDebouncedCallback,
} from "use-debounce";

import {
  DEBOUNCE_INPUT_MS,
} from "utils/Constants";
import PageContent from "templates/PageContent";
import SearchInput from "components/StockSearch/SearchInput";
import { handleUnloadCreator } from "utils/Utilities";

type Props = {
  handleSearch: (nextValue: string) => Promise<Search[]>;
};

const SearchView: React.FC<Props> = (
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
    useCallback(
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
      [
        handleSearch,
      ],
    ),
    DEBOUNCE_INPUT_MS,
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

  return (
    <PageContent>
      <Heading
        level="1"
        size="large"
        margin={
          {
            vertical: "large",
          }
        }
      >
        Ticker Search
      </Heading>
      <Text
        size="medium"
        color="text-xweak"
        margin={
          {
            top: "none",
            bottom: "xsmall",
          }
        }
      >
        Select the stock ticker to trade.
      </Text>
      <Box>
        <SearchInput
          handleSearch={handleSearchLazily}
          searchState={searchState}
          searchResults={searchResults}
        />
      </Box>
    </PageContent>
  );
};

export default SearchView;
