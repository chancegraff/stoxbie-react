import React from "react";
import {
  Box,
  Heading,
  Text,
} from "grommet";
import {
  Search,
} from "iex-cloud";

import PageContent from "templates/PageContent";
import TickerInput from "components/TickerInput";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

const SearchView: React.FC<Props> = (
  props,
) =>
{
  return (
    <PageContent>
      <Heading
        level="1"
        size="large"
        margin={
          {
            vertical: "small",
          }
        }
      >
        Ticker Search
      </Heading>
      <Text
        size="medium"
        margin={
          {
            vertical: "large",
          }
        }
      >
        Select the stock ticker to trade.
      </Text>
      <Box>
        <TickerInput handleSearch={props.handleSearch} />
      </Box>
    </PageContent>
  );
};

export default SearchView;
