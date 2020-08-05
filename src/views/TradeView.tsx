import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { closestIndexTo, parseISO } from "date-fns";
import { HistoricalPrice } from "iex";
import useResizeObserver from "use-resize-observer";

import { useCookie } from "services/Cookies";
import { handleUnloadCreator } from "services/Utilities";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import { AspectRatioBox, AspectRatioItem } from "components/AspectRatio";
import FlexGrid from "components/BaseUI/FlexGrid";
import Err from "components/BaseUI/Typography";
import StockChart from "components/StockChart";
import TimeControl from "components/TimeControl";
import TradeControl from "components/TradeControl";
import TradeHistory from "components/TradeHistory";

type Props = {
  date?: Date;
  error?: string;
  prices?: HistoricalPrice[];
  ticker?: string;
};

const getPriceIndexes = (
  prices: HistoricalPrice[],
  date: Date,
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

const startNextTrade = (
  previousTrade: HistoricalTradeFinished,
  currentBalance: number,
) => {
  return {
    count: 0,
    date: new Date(),
    openBalance: currentBalance + previousTrade.changeBalance,
    ticker: previousTrade.ticker,
  };
};

const finishTrade = (
  previousTrade: HistoricalTradeStarted,
  shareClose: number,
  shareCount: number,
): HistoricalTradeFinished => {
  const close = shareClose;
  const closeDate = new Date();
  const closeBalance = Math.abs(
    shareCount,
  ) * shareClose;
  const changePrice = close - previousTrade.open;
  const changePercent = changePrice / previousTrade.open;
  const changeBalance = closeBalance - previousTrade.openBalance;

  const currentTrade = {
    ...previousTrade,
    changeBalance,
    changePercent,
    changePrice,
    close,
    closeBalance,
    closeDate,
  };

  return currentTrade;
};

const startTrade = (
  previousTrade: HistoricalTrade,
  shareClose: number,
  shareCount: number,
): HistoricalTradeStarted => {
  const open = shareClose;
  const openDate = new Date();
  const openBalance = shareCount * shareClose;
  const currentTrade = {
    ...previousTrade,
    open,
    openBalance,
    openDate,
  };

  return currentTrade;
};

const TradeView: React.FC<Props> = (
  {
    prices,
    date,
    error,
    ticker,
  },
) => {
  const [
    , theme,
  ] = useStyletron();
  const {
    ref,
    width = 1,
    height = 1,
  } = useResizeObserver<HTMLDivElement>();

  const [
    pastPrices,
    setPastPrices,
  ] = useState<HistoricalPrice[]>();
  const [
    nextPriceIndexes,
    setNextPriceIndexes,
  ] = useState<number[]>();
  const [
    pastTrades,
    setPastTrades,
  ] = useCookie<HistoricalTrade[]>(
    "pastTrades",
    [],
  );

  const currentPrice = useMemo(
    () => {
      return pastPrices && pastPrices[pastPrices.length - 1];
    },
    [
      pastPrices,
    ],
  );
  const currentBalance = useMemo(
    () => {
      if (pastTrades.length > 0) {
        const [
          currentTrade,
        ] = pastTrades;

        return currentTrade.open
          ? currentTrade.closeBalance
          : currentTrade.openBalance;
      }
    },
    [
      pastTrades,
    ],
  );

  const handleLoad = useCallback(
    (
      nextPrices?: HistoricalPrice[],
      nextDate?: Date,
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
        prices &&
        nextPriceIndexes &&
        canGetNextPrice(
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
  const handleTrade = useCallback(
    (
      previousBalance: number,
      shareClose: number,
      shareCount: number,
    ) => {
      const [
        previousTrade,
        ...nextTrades
      ] = pastTrades;

      if (previousTrade.open === undefined) {
        nextTrades.unshift(
          startTrade(
            previousTrade,
            shareClose,
            shareCount,
          ),
        );
      } else if (previousTrade.close === undefined) {
        const startedTrade = previousTrade as HistoricalTradeStarted;
        const finishedTrade = finishTrade(
          startedTrade,
          shareClose,
          shareCount,
        );
        const nextTrade = startNextTrade(
          finishedTrade,
          previousBalance,
        );

        nextTrades.unshift(
          nextTrade,
          finishedTrade,
        );
      } else {
        nextTrades.unshift(
          previousTrade,
        );
      }

      setPastTrades(
        nextTrades,
        30,
      );
    },
    [
      pastTrades,
      setPastTrades,
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
      if (!pastTrades.length && ticker && date) {
        const openBalance = 10000;
        const count = 0;
        const initialTrade: HistoricalTrade = {
          count,
          date,
          openBalance,
          ticker,
        };

        setPastTrades(
          [
            initialTrade,
          ],
          30,
        );
      }
    },
    [
      pastTrades,
      ticker,
      date,
      setPastTrades,
    ],
  );

  useEffect(
    () => {
      return handleUnloadCreator(
        [
          setPastPrices,
          setNextPriceIndexes,
        ],
      );
    },
    [],
  );

  if (error) {
    return (
      <Err>
        {error}
      </Err>
    );
  }

  return (
    <ContentContainer>
      <Block
        marginBottom={theme.sizing.scale800}
        width="100%"
      >
        <BreadcrumbContainer />
      </Block>
      <FlexGrid
        flexWrap={[
          true,
          true,
          true,
          false,
        ]}
      >
        <AspectRatioBox component={FlexGridItem}>
          <AspectRatioItem ref={ref}>
            <StockChart
              prices={pastPrices}
              resolution={[
                width,
                height,
              ]}
            />
          </AspectRatioItem>
        </AspectRatioBox>
        <FlexGridItem
          display="flex"
          flexDirection="column"
          height={`${height}px`}
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
          <TradeControl
            balance={currentBalance}
            handleTrade={handleTrade}
            price={currentPrice}
          />
          <TradeHistory trades={pastTrades} />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
