import React, { useCallback } from "react";
import { Display2, Label2 } from "baseui/typography";
import { Block } from "baseui/block";
import { search, Search } from "iex-cloud";
import TickerInput from "components/TickerInput";

type Props = unknown;

const TickerSearch: React.FC<Props> = () => {
  const handleSearch = useCallback(
    async (
      nextValue: string,
      setOptions: React.Dispatch<React.SetStateAction<Search[]>>
    ) => {
      const options = await search(nextValue);
      const filtered = options?.filter((option) =>
        option.symbol.includes(nextValue)
      );
      setOptions(filtered);
    },
    []
  );

  return (
    <>
      <Block>
        <Display2>Ticker Search</Display2>
        <Label2>Select the stock ticker to trade.</Label2>
      </Block>
      <Block>
        <TickerInput handleSearch={handleSearch} />
      </Block>
    </>
  );
};

export default TickerSearch;
