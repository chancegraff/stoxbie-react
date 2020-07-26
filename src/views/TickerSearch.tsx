import React, { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Display2, Label2 } from "baseui/typography";
import { search, Search } from "iex-cloud";
import { DEBOUNCE_INPUT_MS } from "services/Constants";
import ContentContainer from "templates/ContentContainer";
import TickerInput from "components/TickerInput";

type Props = unknown;

const TickerSearch: React.FC<Props> = () => {
  const [, theme] = useStyletron();

  const [handleFetch] = useDebouncedCallback(
    async (
      nextValue: string,
      setOptions: React.Dispatch<React.SetStateAction<Search[]>>
    ) => {
      const options = await search(nextValue);
      const filtered = options?.filter((option) =>
        option.symbol.toLowerCase().includes(nextValue.toLowerCase())
      );
      setOptions(filtered);
    },
    DEBOUNCE_INPUT_MS
  );
  const handleSearch = useCallback(
    (
      nextValue: string,
      setOptions: React.Dispatch<React.SetStateAction<Search[]>>
    ) => {
      if (nextValue) {
        handleFetch(nextValue, setOptions);
      } else {
        setOptions([]);
      }
    },
    []
  );

  return (
    <ContentContainer>
      <Block padding={`${theme.sizing.scale800} 0`}>
        <Display2>Ticker Search</Display2>
        <Label2>Select the stock ticker to trade.</Label2>
      </Block>
      <Block>
        <TickerInput handleSearch={handleSearch} />
      </Block>
    </ContentContainer>
  );
};

export default TickerSearch;
