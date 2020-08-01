import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { AspectRatioBox, AspectRatioItem } from "components/AspectRatio";
import BalanceHistory from "components/BalanceHistory";
import FlexGrid from "components/BaseUI/FlexGrid";
import Error from "components/BaseUI/Typography";
import StockChart from "components/StockChart";
import TimeControl from "components/TimeControl";
import TradeControl from "components/TradeControl";
import { isSameDay, parse } from "date-fns";
import { HistoricalPrice } from "iex";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IEX_DATE_FORMAT } from "services/Constants";
import { handleUnloadCreator } from "services/Utilities";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import useResizeObserver from "use-resize-observer";

type Props = {
  prices?: HistoricalPrice[];
  date?: Date;
  error?: string;
};

const getPriceIndexes = (prices: HistoricalPrice[], date: Date) => {
  const startDateIndex = prices.findIndex((price) => {
    const priceDate = parse(price.date,
IEX_DATE_FORMAT,
new Date());

    return isSameDay(priceDate,
date);
  });
  const endDateIndex = startDateIndex > -1 ? startDateIndex - 730 : 0;

  return [endDateIndex,
startDateIndex];
};

const canGetNextPrice = (prices: HistoricalPrice[], nextPriceIndexes: number[]) => {
  const [, startDateIndex] = nextPriceIndexes;

  return prices.length > startDateIndex;
};

const setNextPrices = (
  prices: HistoricalPrice[],
  priceIndexes: number[],
  {
    setPastPrices,
    setNextPriceIndexes
  }: {
    setPastPrices: DispatchSetStateAction<HistoricalPrice[] | undefined>;
    setNextPriceIndexes: DispatchSetStateAction<number[] | undefined>;
  }
) => {
  const nextPrices = prices.slice(...priceIndexes);

  setPastPrices(nextPrices);
  setNextPriceIndexes(priceIndexes.map((i) => ++i));
};

const TradeView: React.FC<Props> = ({ prices, date, error }) => {
  const [, theme] = useStyletron();
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  const [pastPrices,
setPastPrices] = useState<HistoricalPrice[]>();
  const [nextPriceIndexes,
setNextPriceIndexes] = useState<number[]>();

  const currentPrice = useMemo(() => pastPrices && pastPrices[pastPrices.length - 1],
[pastPrices]);

  const handleLoad = useCallback(
(prices?: HistoricalPrice[], date?: Date) => {
    if (prices && date) {
      const priceIndexes = getPriceIndexes(
prices,
        date
);

      setNextPrices(
prices,
        priceIndexes,
        {
        setPastPrices,
          setNextPriceIndexes,
      }
);
    }
  },
  []
);

  const handleContinue = useCallback(
() => {
    if (prices && nextPriceIndexes && canGetNextPrice(
prices,
      nextPriceIndexes
)) {
      setNextPrices(
prices,
        nextPriceIndexes,
        {
          setPastPrices,
          setNextPriceIndexes
      }
);
    }
  },
  [
prices,
    nextPriceIndexes
]
);

  useEffect(
() => {
    if (!pastPrices) {
      handleLoad(
prices,
        date
);
    }
  },
  [
pastPrices,
    handleLoad,
    prices,
    date
]
);

  useEffect(() => handleUnloadCreator([setPastPrices]),
[]);

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <ContentContainer>
      <Block width="100%" marginBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </Block>
      <FlexGrid flexWrap={[true,
true,
true,
false]}>
        <AspectRatioBox component={FlexGridItem}>
          <AspectRatioItem ref={ref}>
            <StockChart resolution={[width,
height]} prices={pastPrices} />
          </AspectRatioItem>
        </AspectRatioBox>
        <FlexGridItem flex="1 1" maxWidth={["100%",
"100%",
"25%"]} minWidth={["auto",
"30%",
"25%"]}>
          <TimeControl handleContinue={handleContinue} />
          <TradeControl price={currentPrice} />
          <BalanceHistory />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
