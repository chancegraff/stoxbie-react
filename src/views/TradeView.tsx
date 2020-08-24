import React, {
  DispatchSetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  closestIndexTo,
  parseISO,
} from "date-fns";
import {
  Box,
  Grid,
} from "grommet";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTrade,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";
import useResizeObserver from "use-resize-observer";

import {
  useCookie,
} from "utils/Cookies";
import {
  handleUnloadCreator,
} from "utils/Utilities";
import {
  AspectRatioBox, AspectRatioItem,
} from "templates/AspectRatio";
import PageContent from "templates/PageContent";
import PageError from "templates/PageError";
import OrderForm from "components/HoldingControls/OrderForm";
import HoldingsTable from "components/OrderHistory/HoldingsTable";
import ForwardTime from "components/TimeControls/ForwardTime";
import StockChart from "components/VX/StockChart";

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
  const priceDates = prices.map(
    (
      {
        date: dateString,
      },
    ) =>
    {
      return parseISO(
        dateString,
      );
    },
  );
  const startDateIndex = closestIndexTo(
    date,
    priceDates,
  );
  const endDateIndex = Math.max(
    startDateIndex - 730,
    0,
  );

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
    setHistoricalPrices,
    setNextPriceIndexes,
  }: {
    setHistoricalPrices: DispatchSetStateAction<HistoricalPrice[] | undefined>;
    setNextPriceIndexes: DispatchSetStateAction<number[] | undefined>;
  },
) =>
{
  const nextPriceIndexes = priceIndexes.map(
    (
      index,
    ) =>
    {
      return index + 1;
    },
  );
  const nextPrices = prices.slice(
    ...nextPriceIndexes,
  );

  setHistoricalPrices(
    nextPrices,
  );
  setNextPriceIndexes(
    nextPriceIndexes,
  );
};

const getOpenedTrade = (
  previousTrade: HistoricalTrade,
  shareClose: number,
  shareCount: number,
): HistoricalTradeStarted =>
{
  const openPrice = shareClose;
  const openCount = Math.abs(
    shareCount,
  );
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
  const closeCount = Math.abs(
    shareCount,
  );
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

const TradeView: React.FC<Props> = (
  {
    prices,
    date,
    error,
    ticker,
  },
) =>
{
  const {
    ref,
    width = 1,
    height = 1,
  } = useResizeObserver();
  const [
    nextPriceIndexes,
    setNextPriceIndexes,
  ] = useState<number[]>();
  const [
    historicalPrices,
    setHistoricalPrices,
  ] = useState<HistoricalPrice[]>();
  const [
    historicalHoldings,
    setHistoricalHoldings,
  ] = useCookie<HistoricalTradeFinished[]>(
    "historicalHoldings",
    [],
  );
  const [
    historicalLedgers,
    setHistoricalLedgers,
  ] = useCookie<HistoricalLedger[]>(
    "historicalLedgers",
    [
      {
        totalBalance: 10000,
        totalChange: 0,
        totalReturns: 0,
        totalCount: 0,
      },
    ],
  );
  const [
    presentHoldings,
    setPresentHoldings,
  ] = useCookie<HistoricalTradeStarted[]>(
    "presentHoldings",
    [],
  );
  const presentPrice = useMemo(
    () =>
    {
      return historicalPrices && historicalPrices[historicalPrices.length - 1];
    },
    [
      historicalPrices,
    ],
  );
  const presentLedger = useMemo(
    () =>
    {
      const [
        nextLedger,
      ] = historicalLedgers;

      return nextLedger;
    },
    [
      historicalLedgers,
    ],
  );
  const combinedHoldings = useMemo(
    () =>
    {
      if (presentHoldings.length > 0)
      {
        const [
          newestOpenedHolding,
        ] = presentHoldings;
        const highestOpenedHolding = presentHoldings.reduceRight(
          (
            previousHolding,
            nextHolding,
          ) =>
          {
            return previousHolding.openPrice > nextHolding.openPrice
              ? previousHolding
              : nextHolding;
          },
          newestOpenedHolding,
        );

        return highestOpenedHolding;
      }
    },
    [
      presentHoldings,
    ],
  );
  const updatePresentHoldings = useCallback(
    (
      nextTrades: HistoricalTradeStarted[],
    ) =>
    {
      setPresentHoldings(
        nextTrades,
        30,
      );
    },
    [
      setPresentHoldings,
    ],
  );
  const updateHistoricalHoldings = useCallback(
    (
      nextTrades: HistoricalTradeFinished[],
    ) =>
    {
      setHistoricalHoldings(
        [
          ...nextTrades,
          ...historicalHoldings,
        ],
        30,
      );
    },
    [
      historicalHoldings,
      setHistoricalHoldings,
    ],
  );
  const updateHistoricalLedgers = useCallback(
    (
      nextLedger: HistoricalLedger,
    ) =>
    {
      setHistoricalLedgers(
        [
          nextLedger,
          ...historicalLedgers,
        ],
        30,
      );
    },
    [
      historicalLedgers,
      setHistoricalLedgers,
    ],
  );
  const openTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      if (ticker)
      {
        const nextTrade = {
          ticker,
        };
        const {
          ...nextHistoricalLedgers
        } = presentLedger;
        const {
          totalBalance: previousTotalBalance,
          totalChange: previousTotalChange,
          totalReturns: previousTotalReturns,
          totalCount: previousTotalCount,
        } = presentLedger;
        const openedTrade = getOpenedTrade(
          nextTrade,
          sharePrice,
          shareCount,
        );

        nextHistoricalLedgers.totalBalance = previousTotalBalance - (openedTrade.openPrice * openedTrade.openCount);
        nextHistoricalLedgers.totalChange = previousTotalChange;
        nextHistoricalLedgers.totalReturns = previousTotalReturns;
        nextHistoricalLedgers.totalCount = previousTotalCount + openedTrade.openCount;
        const nextPresentHoldings = [
          openedTrade,
          ...presentHoldings,
        ];

        updatePresentHoldings(
          nextPresentHoldings,
        );
        updateHistoricalLedgers(
          nextHistoricalLedgers,
        );
      }
    },
    [
      ticker,
      presentHoldings,
      presentLedger,
      updatePresentHoldings,
      updateHistoricalLedgers,
    ],
  );
  const closeTrade = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      if (presentHoldings.length > 0)
      {
        const {
          ...nextHistoricalLedgers
        } = presentLedger;
        const [
          ...nextPresentHoldings
        ] = presentHoldings;
        const nextHistoricalHoldings: HistoricalTradeFinished[] = [];
        const [
          ...sortedPresentHoldings
        ] = presentHoldings.sort(
          (
            previousTrade,
            nextTrade,
          ) =>
          {
            return previousTrade.openPrice - nextTrade.openPrice;
          },
        );
        let remainingOrderShareCount = Math.abs(
          shareCount,
        );

        while (
          remainingOrderShareCount > 0 &&
            sortedPresentHoldings.length > 0
        )
        {
          const {
            totalBalance: previousTotalBalance,
            totalReturns: previousTotalReturns,
            totalCount: previousTotalCount,
          } = nextHistoricalLedgers;

          // Fill as much of the order as we can with the lowest-opened trade
          const lowestTrade = sortedPresentHoldings.shift() as HistoricalTradeStarted;
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
          nextHistoricalHoldings.unshift(
            closedTrade,
          );

          // Update ledger values and remaining shares in order
          remainingOrderShareCount -= countPossible;
          nextHistoricalLedgers.totalBalance = previousTotalBalance + (closedTrade.closePrice * closedTrade.closeCount);
          nextHistoricalLedgers.totalReturns = previousTotalReturns + closedTrade.changeBalance;
          nextHistoricalLedgers.totalChange = nextHistoricalLedgers.totalReturns / nextHistoricalLedgers.totalBalance;
          nextHistoricalLedgers.totalCount = previousTotalCount - closedTrade.closeCount;

          // Remove the closed trade from current trades
          const lowestTradeIndex = nextPresentHoldings.indexOf(
            lowestTrade,
          );

          nextPresentHoldings.splice(
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

            nextPresentHoldings.splice(
              lowestTradeIndex,
              0,
              nextTrade,
            );
          }
        }

        // Update state values
        updatePresentHoldings(
          nextPresentHoldings,
        );
        updateHistoricalHoldings(
          nextHistoricalHoldings,
        );
        updateHistoricalLedgers(
          nextHistoricalLedgers,
        );
      }
    },
    [
      presentHoldings,
      presentLedger,
      updateHistoricalLedgers,
      updatePresentHoldings,
      updateHistoricalHoldings,
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
            setHistoricalPrices,
          },
        );
      }
    },
    [],
  );
  const handleOrder = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      const currentTradeType = shareCount / Math.abs(
        shareCount,
      );
      const previousTradeOpposite = combinedHoldings && combinedHoldings.openModifier * -1;

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
      combinedHoldings,
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
            setHistoricalPrices,
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
      if (!historicalPrices)
      {
        handleLoad(
          prices,
          date,
        );
      }
    },
    [
      historicalPrices,
      handleLoad,
      prices,
      date,
    ],
  );
  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setHistoricalPrices,
          setNextPriceIndexes,
        ],
      );
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
      <Grid
        responsive={true}
        fill={true}
        gap="medium"
        columns={
          [
            "flex",
            "auto",
          ]
        }
        rows={
          [
            "auto",
          ]
        }
        areas={
          [
            [
              "chart",
              "trades",
            ],
          ]
        }
      >
        <Box gridArea="chart">
          <AspectRatioBox>
            <AspectRatioItem ref={ref}>
              <StockChart
                prices={historicalPrices}
                resolution={
                  [
                    width,
                    height,
                  ]
                }
              />
            </AspectRatioItem>
          </AspectRatioBox>
        </Box>
        <Box
          gridArea="trades"
          height={
            {
              max: `${height}px`,
            }
          }
        >
          <ForwardTime
            handleContinue={handleContinue}
            presentPrice={presentPrice}
          />
          <OrderForm
            presentLedger={presentLedger}
            presentPrice={presentPrice}
            handleOrder={handleOrder}
          />
          {/* <TradeHistory
            historicalHoldings={historicalHoldings}
            presentPrice={presentPrice}
            presentLedger={presentLedger}
            combinedHoldings={combinedHoldings}
            handleOrder={handleOrder}
          /> */}
          <HoldingsTable />
        </Box>
      </Grid>
    </PageContent>
  );
};

export default TradeView;
