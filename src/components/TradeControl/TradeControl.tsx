import React, {
  useCallback,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "iex";

import Spinner from "components/Grommet/Spinner";
import TradeSlider from "components/TradeControl/TradeSlider";

import {
  StyledBuyAction,
  StyledContainer,
  StyledGrid,
  StyledSellAction,
} from "./TradeControl.styled";

type Props = {
  currentPrice?: HistoricalPrice;
  currentLedger?: HistoricalLedger;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeControl: React.FC<Props> = (
  {
    currentPrice,
    currentLedger,
    handleTrade,
  },
) =>
{
  const [
    shareCount,
    setShareAmount,
  ] = useState<number>(
    0,
  );
  const [
    shareModifier,
    setShareModifier,
  ] = useState<1 | -1>(
    1,
  );

  const handleToggle = useCallback(
    () =>
    {
      setShareAmount(
        0,
      );

      if (shareModifier > 0)
      {
        setShareModifier(
          -1,
        );
      }
      else
      {
        setShareModifier(
          1,
        );
      }
    },
    [
      shareModifier,
    ],
  );

  if (!currentPrice || !currentLedger)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <TradeSlider
        currentLedger={currentLedger}
        currentPrice={currentPrice}
        shareCount={shareCount}
        shareModifier={shareModifier}
        setShareAmount={setShareAmount}
      />
      <StyledGrid>
        <StyledBuyAction
          handleToggle={handleToggle}
          handleTrade={handleTrade}
          shareCount={shareCount}
          shareModifier={shareModifier}
          sharePrice={currentPrice.close}
        />
        <StyledSellAction
          handleToggle={handleToggle}
          handleTrade={handleTrade}
          shareCount={shareCount}
          shareModifier={shareModifier}
          sharePrice={currentPrice.close}
        />
      </StyledGrid>
    </StyledContainer>
  );
};

export default TradeControl;
