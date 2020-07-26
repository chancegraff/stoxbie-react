import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Display2, Label2 } from "baseui/typography";
import { Block } from "baseui/block";
import { search, Search } from "iex-cloud";
import { DEBOUNCE_INPUT_MS } from "services/Constants";
import TickerInput from "components/TickerInput";

type Props = unknown;

const TickerSearch: React.FC<Props> = () => {
  const [handleSearch] = useDebouncedCallback(
    async (
      nextValue: string,
      setOptions: React.Dispatch<React.SetStateAction<Search[]>>
    ) => {
      if (nextValue) {
        const options = await search(nextValue);
        const filtered = options?.filter((option) =>
          option.symbol.toLowerCase().includes(nextValue.toLowerCase())
        );
        setOptions(filtered);
      } else {
        setOptions([]);
      }
    },
    DEBOUNCE_INPUT_MS
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
