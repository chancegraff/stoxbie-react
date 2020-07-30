import React from "react";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { Spinner } from "baseui/dist/spinner";
import ContentContainer from "templates/ContentContainer";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import StockChart from "components/StockChart";
import TradeInput from "components/TradeInput";
import Error from "components/BaseUI/Typography";
import FlexGrid, { MultiplyWidth } from "components/BaseUI/FlexGrid";

type Props = {
  prices?: HistoricalPrice[];
  error?: string;
};

const TradeView: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  if (props.error) {
    return <Error>{props.error}</Error>;
  }
  if (!props.prices || !props.prices.length) {
    return (
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    );
  }
  return (
    <ContentContainer>
      <Block width="100%" marginBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </Block>
      <FlexGrid>
        <FlexGridItem>
          <StockChart prices={props.prices} resolution={[800, 500]} />
        </FlexGridItem>
        <FlexGridItem overrides={MultiplyWidth(0.5)}>
          <TradeInput />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
