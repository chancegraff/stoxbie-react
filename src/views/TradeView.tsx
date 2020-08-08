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

const getClosedTrade = (
  previousTrade: HistoricalTradeStarted,
  shareClose: number,
  shareCount: number,
): HistoricalTradeFinished =>
{
  const typeOffset = previousTrade.type === "buy"
    ? 1
    : -1;
  const absoluteCount = Math.abs(shareCount);
  const close = shareClose;
  const closeDate = new Date();
  const closeBalance = absoluteCount * shareClose;
  const changePrice = (close - previousTrade.open) * typeOffset;
  const changePercent = changePrice / previousTrade.open;
  const changeBalance = closeBalance - (absoluteCount * previousTrade.open);
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
  const [
    playerLedger,
    setPlayerLedger,
  ] = useCookie<HistoricalLedger[]>(
    "playerLedger",
    [],
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

  const updateCurrentTrade = useCallback(
    (nextTrade?: HistoricalTrade) =>
    {
      setCurrentTrade(
        nextTrade,
        30,
      );
    },
    [ setCurrentTrade ],
  );
  const updatePastTrades = useCallback(
    (nextTrade: HistoricalTrade) =>
    {
      setPastTrades(
        [
          nextTrade,
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
        const nextBalance = currentLedger.totalBalance - openedTrade.openBalance;
        const nextChange = currentLedger.totalChange;
        const nextLedger = {
          totalBalance: nextBalance,
          totalChange: nextChange,
        };

        updateCurrentTrade(openedTrade);
        updatePlayerLedger(nextLedger);
      }
    },
    [
      ticker,
      date,
      currentLedger,
      updateCurrentTrade,
      updatePlayerLedger,
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

      const nextBalance = currentLedger.totalBalance + closedTrade.closeBalance;
      const nextChange = (currentLedger.totalChange + closedTrade.changePercent) / pastTrades.length;
      const nextLedger = {
        totalBalance: nextBalance,
        totalChange: nextChange,
      };

      updatePastTrades(closedTrade);
      updatePlayerLedger(nextLedger);

      const remainingShares = closedTrade.count - Math.abs(shareCount);

      if (remainingShares > 0)
      {
        const nextTrade: HistoricalTrade = {
          ...openedTrade,
          count: remainingShares,
        };

        updateCurrentTrade(nextTrade);
      }
      else
      {
        updateCurrentTrade(undefined);
      }
    },
    [
      currentTrade,
      pastTrades,
      currentLedger,
      updatePlayerLedger,
      updateCurrentTrade,
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
            currentTrade={currentTrade}
            handleTrade={handleTrade}
            pastTrades={pastTrades}
            playerLedger={currentLedger}
          />
        </FlexGridItem>
      </FlexGrid>
    </PageContent>
  );
};

export default TradeView;
