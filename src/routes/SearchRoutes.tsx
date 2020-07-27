import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { search, Search } from "iex-cloud";
import { DEBOUNCE_INPUT_MS } from "services/Constants";
import ContentContainer from "templates/ContentContainer";
import SearchView from "views/SearchView";

type Props = unknown;

const SearchRoutes: React.FC<Props> = () => {
  const [handleSearch] = useDebouncedCallback(
    async (
      nextValue: string,
      setOptions: React.Dispatch<React.SetStateAction<Search[]>>,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const [...options] = await search(nextValue);
      setOptions(options);
      setIsLoading(false);
    },
    DEBOUNCE_INPUT_MS
  );

  return (
    <ContentContainer>
      <SearchView handleSearch={handleSearch} />
    </ContentContainer>
  );
};

export default SearchRoutes;
