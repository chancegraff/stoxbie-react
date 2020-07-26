import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Display2, Label2 } from "baseui/dist/typography";
import { Cell } from "baseui/dist/layout-grid";
import { search, Search } from "iex-cloud";
import { DEBOUNCE_INPUT_MS } from "services/Constants";
import ContentContainer from "templates/ContentContainer";
import TickerInput from "components/TickerInput";

type Props = unknown;

const TickerSearch: React.FC<Props> = () => {
  const [, theme] = useStyletron();

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
      <Cell span={[12, 6, 8]}>
        <Block marginBottom={theme.sizing.scale800}>
          <Display2>Ticker Search</Display2>
          <Label2>Select the stock ticker to trade.</Label2>
        </Block>
        <Block>
          <TickerInput handleSearch={handleSearch} />
        </Block>
      </Cell>
    </ContentContainer>
  );
};

export default TickerSearch;
