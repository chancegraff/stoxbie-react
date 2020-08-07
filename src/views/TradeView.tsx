import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import {
  closestIndexTo, parseISO,
} from "date-fns";
import { HistoricalPrice } from "iex";
import useResizeObserver from "use-resize-observer";

import { useCookie } from "services/Cookies";
import { handleUnloadCreator } from "services/Utilities";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import {
  AspectRatioBox, AspectRatioItem,
} from "components/AspectRatio";
import FlexGrid from "components/BaseUI/FlexGrid";
import Err from "components/BaseUI/Typography";
import StockChart from "components/StockChart";
import TimeControl from "components/TimeControl";
import TradeControl from "components/TradeControl/TradeControl";
import TradeHistory from "components/TradeHistory";

type Props = {
  date?: Date;
  error?: string;
  prices?: HistoricalPrice[];
  ticker?: string;
};

type TradeResults = {
  currentTrade: HistoricalTrade | undefined | null;
  mainBalance: number | null;
  pastTrades: HistoricalTrade[] | null;
};

const getPriceIndexes = (
  prices: HistoricalPrice[],
  date: Date,
) =>
{
  const priceDates = prices.map(({ date: dateString }) =>
  {
    return parseISO(dateString);
  });
  const startDateIndex = closestIndexTo(
    date,
    priceDates,
  );
  const endDateIndex = startDateIndex > -1
    ? startDateIndex - 730
    : 0;

  return [
    endDateIndex,
    startDateIndex,
  ];
};

const canGetNextPrice = (
  prices: HistoricalPrice[],
  nextPriceIndexes: number[],
) =>
{
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
) =>
{
  const nextPrices = prices.slice(...priceIndexes);

  setPastPrices(nextPrices);
  setNextPriceIndexes(priceIndexes.map((index) =>
  {
    return index + 1;
  }));
};

const getClosedTrade = (
  previousTrade: HistoricalTradeStarted,
  shareClose: number,
  shareCount: number,
): HistoricalTradeFinished =>
{
  const typeOffset = previousTrade.type === "buy"
    ? 1
    : -1;
  const close = shareClose;
  const closeDate = new Date();
  const closeBalance = Math.abs(shareCount) * shareClose;
  const changePrice = (close - previousTrade.open) * typeOffset;
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

const getOpenedTrade = (
  previousTrade: HistoricalTrade,
  shareClose: number,
  shareCount: number,
): HistoricalTradeStarted =>
{
  const open = shareClose;
  const openDate = new Date();
  const openBalance = Math.abs(shareCount) * shareClose;
  const currentTrade = {
    ...previousTrade,
    open,
    openBalance,
    openDate,
  };

  return currentTrade;
};

const TradeView: React.FC<Props> = ({
  prices,
  date,
  error,
  ticker,
}) =>
{
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
    mainBalance,
    setMainBalance,
  ] = useCookie<number>(
    "mainBalance",
    10000,
  );
  const [
    pastTrades,
    setPastTrades,
  ] = useCookie<HistoricalTrade[]>(
    "pastTrades",
    [],
  );
  const [
    currentTrade,
    setCurrentTrade,
  ] = useCookie<HistoricalTrade | undefined>(
    "currentTrade",
    undefined,
  );

  const currentPrice = useMemo(
    () =>
    {
      return pastPrices && pastPrices[pastPrices.length - 1];
    },
    [ pastPrices ],
  );

  const updateTradeResults = useCallback(
    (results: TradeResults) =>
    {
      if (results.mainBalance !== null)
      {
        setMainBalance(
          results.mainBalance,
          30,
        );
      }
      if (results.currentTrade !== null)
      {
        setCurrentTrade(
          results.currentTrade,
          30,
        );
      }
      if (results.pastTrades !== null)
      {
        setPastTrades(
          results.pastTrades,
          30,
        );
      }
    },
    [
      setMainBalance,
      setPastTrades,
      setCurrentTrade,
    ],
  );

  const openTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      if (ticker && date)
      {
        const count = Math.abs(shareCount);
        const type: "buy" | "sell" = shareCount > 0
          ? "buy"
          : "sell";
        const nextTrade = {
          count,
          date,
          ticker,
          type,
        };
        const openedTrade = getOpenedTrade(
          nextTrade,
          sharePrice,
          shareCount,
        );
        const tradeResults: TradeResults = {
          currentTrade: openedTrade,
          mainBalance: mainBalance - Math.abs(openedTrade.openBalance),
          pastTrades: null,
        };

        updateTradeResults(tradeResults);
      }
    },
    [
      ticker,
      date,
      mainBalance,
      updateTradeResults,
    ],
  );
  const closeTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      const openedTrade = currentTrade as HistoricalTradeStarted;
      const closedTrade = getClosedTrade(
        openedTrade,
        sharePrice,
        shareCount,
      );
      const tradeResults: TradeResults = {
        currentTrade: undefined,
        mainBalance: mainBalance + closedTrade.closeBalance,
        pastTrades: [
          closedTrade,
          ...pastTrades,
        ],
      };

      updateTradeResults(tradeResults);
    },
    [
      currentTrade,
      mainBalance,
      pastTrades,
      updateTradeResults,
    ],
  );

  const handleLoad = useCallback(
    (
      nextPrices?: HistoricalPrice[],
      nextDate?: Date,
    ) =>
    {
      if (nextPrices && nextDate)
      {
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
  const handleTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      if (currentTrade)
      {
        closeTrade(
          sharePrice,
          shareCount,
        );
      }
      else
      {
        openTrade(
          sharePrice,
          shareCount,
        );
      }
    },
    [
      currentTrade,
      openTrade,
      closeTrade,
    ],
  );
  const handleContinue = useCallback(
    () =>
    {
      if (
        prices &&
        nextPriceIndexes &&
        canGetNextPrice(
          prices,
          nextPriceIndexes,
        )
      )
      {
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
    () =>
    {
      if (!pastPrices)
      {
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
    () =>
    {
      return handleUnloadCreator([
        setPastPrices,
        setNextPriceIndexes,
      ]);
    },
    [],
  );

  if (error)
  {
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
        flexWrap={
          [
            true,
            true,
            true,
            false,
          ]
        }
      >
        <AspectRatioBox component={FlexGridItem}>
          <AspectRatioItem ref={ref}>
            <StockChart
              prices={pastPrices}
              resolution={
                [
                  width,
                  height,
                ]
              }
            />
          </AspectRatioItem>
        </AspectRatioBox>
        <FlexGridItem
          display="flex"
          flexDirection="column"
          height={`${height}px`}
          maxWidth={
            [
              "100%",
              "100%",
              "25%",
            ]
          }
          minWidth={
            [
              "auto",
              "30%",
              "25%",
            ]
          }
        >
          <TimeControl handleContinue={handleContinue} />
          <TradeControl
            balance={mainBalance}
            handleTrade={handleTrade}
            price={currentPrice}
          />
          <TradeHistory
            currentTrade={currentTrade}
            pastTrades={pastTrades}
          />
        </FlexGridItem>
      </FlexGrid>
    </ContentContainer>
  );
};

export default TradeView;
