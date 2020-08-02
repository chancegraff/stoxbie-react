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
import { closestIndexTo, parseISO } from "date-fns";
import { HistoricalPrice } from "iex";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { handleUnloadCreator } from "services/Utilities";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import useResizeObserver from "use-resize-observer";

type Props = {
  prices?: HistoricalPrice[];
  date?: Date;
  error?: string;
};

const getPriceIndexes = (
  prices: HistoricalPrice[], date: Date,
) => {
  const priceDates = prices.map(
    (
      {
        date: dateString,
      },
    ) => {
      return parseISO(
        dateString,
      );
    },
  );
  const startDateIndex = closestIndexTo(
    date,
    priceDates,
  );
  const endDateIndex = startDateIndex > -1 ? startDateIndex - 730 : 0;

  return [
    endDateIndex,
    startDateIndex,
  ];
};

const canGetNextPrice = (
  prices: HistoricalPrice[],
  nextPriceIndexes: number[],
) => {
  const [
    , startDateIndex,
  ] = nextPriceIndexes;

  return prices.length > startDateIndex;
};

const setNextPrices = (
  prices: HistoricalPrice[],
  priceIndexes: number[],
  {
    setPastPrices,
    setNextPriceIndexes,
  }: {
    setPastPrices: DispatchSetStateAction<HistoricalPrice[] | undefined>;
    setNextPriceIndexes: DispatchSetStateAction<number[] | undefined>;
  },
) => {
  const nextPrices = prices.slice(
    ...priceIndexes,
  );

  setPastPrices(
    nextPrices,
  );
  setNextPriceIndexes(
    priceIndexes.map(
      (
        index,
      ) => {
        return index + 1;
      },
    ),
  );
};

const TradeView: React.FC<Props> = (
  {
    prices, date, error,
  },
) => {
  const [
    , theme,
  ] = useStyletron();
  const {
    ref, width = 1, height = 1,
  } = useResizeObserver<HTMLDivElement>();

  const [
    pastPrices,
    setPastPrices,
  ] = useState<HistoricalPrice[]>();
  const [
    nextPriceIndexes,
    setNextPriceIndexes,
  ] = useState<number[]>();

  const currentPrice = useMemo(
    () => {
      return pastPrices && pastPrices[pastPrices.length - 1];
    },
    [
      pastPrices,
    ],
  );

  const handleLoad = useCallback(
    (
      nextPrices?: HistoricalPrice[], nextDate?: Date,
    ) => {
      if (nextPrices && nextDate) {
        const priceIndexes = getPriceIndexes(
          nextPrices,
          nextDate,
        );

        setNextPrices(
          nextPrices,
          priceIndexes,
          {
            setNextPriceIndexes,
            setPastPrices,
          },
        );
      }
    },
    [],
  );

  const handleContinue = useCallback(
    () => {
      if (
        prices
      && nextPriceIndexes
      && canGetNextPrice(
        prices,
        nextPriceIndexes,
      )
      ) {
        setNextPrices(
          prices,
          nextPriceIndexes,
          {
            setNextPriceIndexes,
            setPastPrices,
          },
        );
      }
    },
    [
      prices,
      nextPriceIndexes,
    ],
  );

  useEffect(
    () => {
      if (!pastPrices) {
        handleLoad(
          prices,
          date,
        );
      }
    },
    [
      pastPrices,
      handleLoad,
      prices,
      date,
    ],
  );

  useEffect(
    () => {
      return handleUnloadCreator(
        [
          setPastPrices,
        ],
      );
    },
    [],
  );

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <ContentContainer>
      <Block width="100%" marginBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </Block>
      <FlexGrid flexWrap={[
        true,
        true,
        true,
        false,
      ]}>
        <AspectRatioBox component={FlexGridItem}>
          <AspectRatioItem ref={ref}>
            <StockChart resolution={[
              width,
              height,
            ]} prices={pastPrices} />
          </AspectRatioItem>
        </AspectRatioBox>
        <FlexGridItem
          flex="1 1"
          maxWidth={[
            "100%",
            "100%",
            "25%",
          ]}
          minWidth={[
            "auto",
            "30%",
            "25%",
          ]}
        >
          <TimeControl handleContinue={handleContinue} />
          <TradeControl price={currentPrice} />
          <BalanceHistory />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
