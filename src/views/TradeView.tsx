import React, { useState, useEffect, useCallback } from "react";
import { isSameDay, parse } from "date-fns";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { IEX_DATE_FORMAT } from "services/Constants";
import { handleUnloadCreator } from "services/Utilities";
import ContentContainer from "templates/ContentContainer";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import StockChart from "components/StockChart";
import TradeInput from "components/TradeInput";
import Error from "components/BaseUI/Typography";
import FlexGrid, { MultiplyWidth } from "components/BaseUI/FlexGrid";

type Props = {
  prices?: HistoricalPrice[];
  date?: Date;
  error?: string;
};

const TradeView: React.FC<Props> = ({ prices, date, error }) => {
  const [, theme] = useStyletron();
  const [pastPrices, setPastPrices] = useState<HistoricalPrice[]>();

  const handleLoad = useCallback((prices?: HistoricalPrice[], date?: Date) => {
    if (prices && date) {
      const startDate = prices.findIndex((price) => {
        const priceDate = parse(price.date, IEX_DATE_FORMAT, new Date());
        return isSameDay(priceDate, date);
      });
      const endDate = startDate > -1 ? startDate - 730 : 0;
      const nextPrices = prices.slice(endDate, startDate);
      setPastPrices(nextPrices);
    }
  }, []);

  useEffect(() => {
    handleLoad(prices, date);
  }, [handleLoad, prices, date]);

  useEffect(() => handleUnloadCreator([setPastPrices]), []);

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <ContentContainer>
      <Block width="100%" marginBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </Block>
      <FlexGrid>
        <FlexGridItem>
          <StockChart prices={pastPrices} />
        </FlexGridItem>
        <FlexGridItem overrides={MultiplyWidth(0.5)}>
          <TradeInput />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
