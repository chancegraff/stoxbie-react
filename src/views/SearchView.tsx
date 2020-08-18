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
        <TickerInput handleSearch={props.handleSearch} />
      </Box>
    </PageContent>
  );
};

export default SearchView;
