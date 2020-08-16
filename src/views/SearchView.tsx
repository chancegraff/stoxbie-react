import React from "react";
import {
  Display2,
  Label2,
} from "baseui/dist/typography";
import {
  Box,
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
      <Box
        width={
          {
            min: "60%",
            max: "100%",
          }
        }
      >
        <Box
          margin={
            {
              bottom: "24px",
            }
          }
        >
          <Display2>
            Ticker Search
          </Display2>
          <Label2>
            Select the stock ticker to trade.
          </Label2>
        </Box>
        <Box>
          <TickerInput handleSearch={props.handleSearch} />
        </Box>
      </Box>
    </PageContent>
  );
};

export default SearchView;
