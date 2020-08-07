import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import {
  styled, useStyletron,
} from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Button } from "baseui/dist/button";
import { FlexGridItem } from "baseui/dist/flex-grid";
import {
  Slider,
  State,
  StyledTick,
  StyledTickBar,
} from "baseui/dist/slider";
import { HistoricalPrice } from "iex";

import { SLIDER_TICK_COUNT } from "services/Constants";
import { usePrevious } from "services/Utilities";
import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";

type Props = {
  price?: HistoricalPrice;
  balance?: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const FullButton = styled(
  Button,
  { width: "100%" },
);

const Container = styled(
  Block,
  ({ $theme }) =>
  {
    return {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: `${$theme.sizing.scale800} 0`,
    };
  },
);

const TickBar = styled(
  StyledTickBar,
  ({ $theme }) =>
  {
    return {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    };
  },
);

const TradeControl: React.FC<Props> = ({
  price,
  balance,
  handleTrade,
}) =>
{
  const [
    , theme,
  ] = useStyletron();
  const [
    purchaseAmount,
    setPurchaseAmount,
  ] = useState<number>(0);
  const previousPrice = usePrevious(price);
  const previousBalance = usePrevious(balance);
  const hasPriceChanged = useMemo(
    () =>
    {
      return (
        price &&
        previousPrice &&
        price !== previousPrice
      );
    },
    [
      price,
      previousPrice,
    ],
  );
  const hasBalanceChanged = useMemo(
    () =>
    {
      return (
        balance &&
        previousBalance &&
        balance !== previousBalance
      );
    },
    [
      balance,
      previousBalance,
    ],
  );
  const maxPurchasable = useMemo(
    () =>
    {
      return balance && price
        ? Math.floor(balance / price.close)
        : 0;
    },
    [
      price,
      balance,
    ],
  );
  const percentWidthPerShare = useMemo(
    () =>
    {
      return 100 / maxPurchasable;
    },
    [ maxPurchasable ],
  );
  const sharesPerTick = useMemo(
    () =>
    {
      const remainder = maxPurchasable % SLIDER_TICK_COUNT;
      const numerator = maxPurchasable - remainder;

      return Math.floor(numerator / SLIDER_TICK_COUNT);
    },
    [ maxPurchasable ],
  );
  const tickRange = useMemo(
    () =>
    {
      return Array.from(
        Array(SLIDER_TICK_COUNT + 1),
        (
          element,
          index,
        ) =>
        {
          return sharesPerTick * index;
        },
      );
    },
    [ sharesPerTick ],
  );

  const Tick = useMemo(
    () =>
    {
      return styled(
        StyledTick,
        ({ $theme }) =>
        {
          return {
            ...$theme.typography.font100,
            ":hover": { cursor: "pointer" },
            margin: `0 calc(calc(${percentWidthPerShare * sharesPerTick}% - 14px) / 2)`,
            textAlign: "center",
            width: "14px",
          };
        },
      );
    },
    [
      percentWidthPerShare,
      sharesPerTick,
    ],
  );

  const handleTick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) =>
    {
      const { currentTarget: { textContent } } = event;

      if (textContent)
      {
        const tickValue = parseInt(
          textContent,
          10,
        );

        setPurchaseAmount(tickValue);
      }
    },
    [],
  );
  const handleChange = useCallback(
    (event: State) =>
    {
      const [ nextPurchaseAmount ] = event.value;

      setPurchaseAmount(nextPurchaseAmount);
    },
    [],
  );
  const handleBuy = useCallback(
    () =>
    {
      if (price)
      {
        const shareCount = Math.abs(purchaseAmount);

        handleTrade(
          price.close,
          shareCount,
        );
      }
    },
    [
      handleTrade,
      purchaseAmount,
      price,
    ],
  );
  const handleSell = useCallback(
    () =>
    {
      if (price)
      {
        const shareCount = Math.abs(purchaseAmount) * -1;

        handleTrade(
          price.close,
          shareCount,
        );
      }
    },
    [
      handleTrade,
      purchaseAmount,
      price,
    ],
  );

  useEffect(
    () =>
    {
      if (hasPriceChanged || hasBalanceChanged)
      {
        setPurchaseAmount(0);
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
    ],
  );

  if (!price)
  {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <Slider
        max={maxPurchasable}
        onChange={handleChange}
        overrides={
          {
            TickBar: () =>
            {
              return (
                <TickBar>
                  {
                    tickRange.map((
                      tickValue,
                      index,
                    ) =>
                    {
                      const nextTickValue = tickRange[index + 1];

                      if (nextTickValue)
                      {
                        return (
                          <Tick
                            key={index}
                            onClick={handleTick}
                          >
                            {Math.round((nextTickValue + tickValue) / 2)}
                          </Tick>
                        );
                      }

                      return null;
                    })
                  }
                </TickBar>
              );
            },
          }
        }
        value={[ purchaseAmount ]}
      />
      <FlexGrid marginTop={theme.sizing.scale400}>
        <FlexGridItem>
          <FullButton onClick={handleBuy}>
            Buy
          </FullButton>
        </FlexGridItem>
        <FlexGridItem>
          <FullButton onClick={handleSell}>
            Sell
          </FullButton>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
