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
import {
  AspectRatioBox, AspectRatioItem,
} from "templates/AspectRatio";
import PageBreadcrumb from "templates/PageBreadcrumb";
import PageContent from "templates/PageContent";
import PageError from "templates/PageError";
import FlexGrid from "components/BaseUI/FlexGrid";
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

const getOpenedTrade = (
  previousTrade: HistoricalTrade,
  shareClose: number,
  shareCount: number,
): HistoricalTradeStarted =>
{
  const openPrice = shareClose;
  const openCount = Math.abs(shareCount);
  const openModifier = (shareCount / openCount) as -1 | 1;
  const openDate = new Date();
  const openBalance = openCount * openPrice;
  const currentTrade = {
    ...previousTrade,
    openPrice,
    openCount,
    openModifier,
    openBalance,
    openDate,
  };

  return currentTrade;
};

const getClosedTrade = (
  previousTrade: HistoricalTradeStarted,
  shareClose: number,
  shareCount: number,
): HistoricalTradeFinished =>
{
  const closePrice = shareClose;
  const closeCount = Math.abs(shareCount);
  const closeModifier = (shareCount / closeCount) as -1 | 1;
  const closeDate = new Date();
  const closeBalance = closeCount * shareClose;
  const changePrice = (closePrice - previousTrade.openPrice) * previousTrade.openModifier;
  const pricePaid = closeCount * previousTrade.openPrice;
  const changeBalance = (closeBalance - pricePaid) * previousTrade.openModifier;
  const changePercent = changeBalance / pricePaid;
  const currentTrade = {
    ...previousTrade,
    changeBalance,
    changePercent,
    changePrice,
    closePrice,
    closeCount,
    closeModifier,
    closeBalance,
    closeDate,
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
    pastTrades,
    setPastTrades,
  ] = useCookie<HistoricalTradeFinished[]>(
    "pastTrades",
    [],
  );
  const [
    currentTrades,
    setCurrentTrades,
  ] = useCookie<HistoricalTradeStarted[]>(
    "currentTrades",
    [],
  );
  const [
    playerLedger,
    setPlayerLedger,
  ] = useCookie<HistoricalLedger[]>(
    "playerLedger",
    [ {
      totalBalance: 10000,
      totalChange: 0,
      totalReturns: 0,
      totalCount: 0,
    } ],
  );

  const currentPrice = useMemo(
    () =>
    {
      return pastPrices && pastPrices[pastPrices.length - 1];
    },
    [ pastPrices ],
  );
  const currentLedger = useMemo(
    () =>
    {
      const [ nextLedger ] = playerLedger;

      return nextLedger;
    },
    [ playerLedger ],
  );
  const visibleTrade = useMemo(
    () =>
    {
      if (currentTrades.length > 0)
      {
        const [ newestOpenedTrade ] = currentTrades;
        const highestOpenedTrade = currentTrades.reduceRight(
          (
            previousTrade,
            nextTrade,
          ) =>
          {
            return previousTrade.openPrice > nextTrade.openPrice
              ? previousTrade
              : nextTrade;
          },
          newestOpenedTrade,
        );

        return highestOpenedTrade;
      }
    },
    [ currentTrades ],
  );

  const updateCurrentTrades = useCallback(
    (nextTrades: HistoricalTradeStarted[]) =>
    {
      setCurrentTrades(
        nextTrades,
        30,
      );
    },
    [ setCurrentTrades ],
  );
  const updatePastTrades = useCallback(
    (nextTrades: HistoricalTradeFinished[]) =>
    {
      setPastTrades(
        [
          ...nextTrades,
          ...pastTrades,
        ],
        30,
      );
    },
    [
      pastTrades,
      setPastTrades,
    ],
  );
  const updatePlayerLedger = useCallback(
    (nextLedger: HistoricalLedger) =>
    {
      setPlayerLedger(
        [
          nextLedger,
          ...playerLedger,
        ],
        30,
      );
    },
    [
      playerLedger,
      setPlayerLedger,
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
        const nextTrade = { ticker };
        const { ...nextPlayerLedger } = currentLedger;
        const {
          totalBalance: previousTotalBalance,
          totalChange: previousTotalChange,
          totalReturns: previousTotalReturns,
          totalCount: previousTotalCount,
        } = currentLedger;
        const openedTrade = getOpenedTrade(
          nextTrade,
          sharePrice,
          shareCount,
        );

        nextPlayerLedger.totalBalance = previousTotalBalance - (openedTrade.openPrice * openedTrade.openCount);
        nextPlayerLedger.totalChange = previousTotalChange;
        nextPlayerLedger.totalReturns = previousTotalReturns;
        nextPlayerLedger.totalCount = previousTotalCount + openedTrade.openCount;

        const nextCurrentTrades = [
          openedTrade,
          ...currentTrades,
        ];

        updateCurrentTrades(nextCurrentTrades);
        updatePlayerLedger(nextPlayerLedger);
      }
    },
    [
      ticker,
      date,
      currentTrades,
      currentLedger,
      updateCurrentTrades,
      updatePlayerLedger,
    ],
  );
  const closeTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      if (currentTrades.length > 0)
      {
        const { ...nextPlayerLedger } = currentLedger;
        const [ ...nextCurrentTrades ] = currentTrades;
        const nextPastTrades: HistoricalTradeFinished[] = [];

        const [ ...sortedCurrentTrades ] = currentTrades.sort((
          previousTrade,
          nextTrade,
        ) =>
        {
          return previousTrade.openPrice - nextTrade.openPrice;
        });

        let remainingOrderShareCount = Math.abs(shareCount);

        while (
          remainingOrderShareCount > 0 &&
          sortedCurrentTrades.length > 0
        )
        {
          const {
            totalBalance: previousTotalBalance,
            totalReturns: previousTotalReturns,
            totalCount: previousTotalCount,
          } = nextPlayerLedger;

          // Fill as much of the order as we can with the lowest-opened trade
          const lowestTrade = sortedCurrentTrades.shift() as HistoricalTradeStarted;
          const countPossible = Math.min(
            lowestTrade.openCount,
            remainingOrderShareCount,
          );
          const closedTrade = getClosedTrade(
            lowestTrade,
            sharePrice,
            countPossible,
          );

          // Add closed trade to front of collection
          nextPastTrades.unshift(closedTrade);

          // Update ledger values and remaining shares in order
          remainingOrderShareCount -= countPossible;
          nextPlayerLedger.totalBalance = previousTotalBalance + (closedTrade.closePrice * closedTrade.closeCount);
          nextPlayerLedger.totalReturns = previousTotalReturns + closedTrade.changeBalance;
          nextPlayerLedger.totalChange = nextPlayerLedger.totalReturns / nextPlayerLedger.totalBalance;
          nextPlayerLedger.totalCount = previousTotalCount - closedTrade.closeCount;

          // Remove the closed trade from current trades
          const lowestTradeIndex = nextCurrentTrades.indexOf(lowestTrade);

          nextCurrentTrades.splice(
            lowestTradeIndex,
            1,
          );

          // Check if there are any shares left in the trade we just removed
          const remainingTradeShareCount = closedTrade.openCount - closedTrade.closeCount;

          if (remainingTradeShareCount > 0)
          {
            // Copy the previous share, update its openBalance and openCount, and add it back in the same place
            const remainingBalance = closedTrade.openPrice * remainingTradeShareCount;
            const nextTrade: HistoricalTradeStarted = {
              ...lowestTrade,
              openBalance: remainingBalance,
              openCount: remainingTradeShareCount,
            };

            nextCurrentTrades.splice(
              lowestTradeIndex,
              0,
              nextTrade,
            );
          }
        }

        // Update state values
        updateCurrentTrades(nextCurrentTrades);
        updatePastTrades(nextPastTrades);
        updatePlayerLedger(nextPlayerLedger);
      }
    },
    [
      currentTrades,
      currentLedger,
      updatePlayerLedger,
      updateCurrentTrades,
      updatePastTrades,
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
      const currentTradeType = shareCount / Math.abs(shareCount);
      const previousTradeOpposite = visibleTrade && visibleTrade.openModifier * -1;

      if (currentTradeType === previousTradeOpposite)
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
      visibleTrade,
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
      <PageError>
        {error}
      </PageError>
    );
  }

  return (
    <PageContent>
      <Block
        marginBottom={theme.sizing.scale800}
        width="100%"
      >
        <PageBreadcrumb />
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
            currentBalance={currentLedger.totalBalance}
            currentPrice={currentPrice}
            handleTrade={handleTrade}
          />
          <TradeHistory
            currentPrice={currentPrice}
            visibleTrade={visibleTrade}
            handleTrade={handleTrade}
            pastTrades={pastTrades}
            playerLedger={currentLedger}
            pastLedgers={playerLedger}
            currentTrades={currentTrades}
          />
        </FlexGridItem>
      </FlexGrid>
    </PageContent>
  );
};

export default TradeView;
