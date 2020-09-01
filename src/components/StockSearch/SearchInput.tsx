import React, {
  PropsHasClass,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useHistory,
} from "react-router-dom";
import {
  Search,
} from "@chancey/iex-cloud";
import {
  AsyncStates,
} from "async-types";
import {
  DropStates,
  SelectEvent,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  handleUnloadCreator,
} from "utils/Utilities";

import {
  GrommetContainer,
  GrommetTextInput,
  GrommetTheme,
} from "./SearchInput.styled";
import SearchResult from "./SearchResult";

type Props = PropsHasClass & {
  handleSearch: (nextValue: string) => void;
  searchState: AsyncStates;
  searchResults: Search[];
};

const StockInput: React.FC<Props> = (
  {
    className,
    handleSearch,
    searchResults,
  },
) =>
{
  const history = useHistory();

  const [
    value,
    setValue,
  ] = useState(
    "",
  );
  const [
    dropState,
    setDropState,
  ] = useState<DropStates>(
    "closed",
  );

  const suggestions = useMemo(
    () =>
    {
      if (searchResults)
      {
        return searchResults.map(
          (
            searchResult,
          ) =>
          {
            return {
              label: (
                <SearchResult
                  css=""
                  searchResult={searchResult}
                />
              ),
              value: searchResult,
            };
          },
        );
      }

      return [];
    },
    [
      searchResults,
    ],
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
      const {
        target: {
          value: nextValue,
        },
      } = event;

      setValue(
        nextValue,
      );

      if (nextValue)
      {
        handleSearch(
          nextValue,
        );
      }
    },
    [
      handleSearch,
    ],
  );
  const handleSelect = useCallback(
    (
      event: SelectEvent<Search>,
    ) =>
    {
      const {
        suggestion: {
          value: nextValue,
        },
      } = event;

      if (nextValue)
      {
        history.push(
          `/stock/${nextValue.symbol}`,
        );
      }
    },
    [
      history,
    ],
  );
  const handleDropOpen = useCallback(
    () =>
    {
      setDropState(
        "opened",
      );
    },
    [],
  );
  const handleDropClose = useCallback(
    () =>
    {
      setDropState(
        "closed",
      );
    },
    [],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setValue,
          setDropState,
        ],
      );
    },
    [],
  );

  return (
    <GrommetTheme css="">
      <GrommetContainer
        css=""
        className={className}
        dropState={dropState}
      >
        <GrommetTextInput
          css=""
          role="search"
          value={value}
          suggestions={suggestions}
          onChange={handleChange}
          onSelect={handleSelect}
          onSuggestionsOpen={handleDropOpen}
          onSuggestionsClose={handleDropClose}
        />
      </GrommetContainer>
    </GrommetTheme>
  );
};

export default StockInput;
