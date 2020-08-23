import React, {
  useCallback,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
} from "trade-types";

import Spinner from "components/Grommet/Spinner";
import TradeSlider from "components/TradeControl/TradeSlider";

import {
  StyledBuyAction,
  StyledContainer,
  StyledGrid,
  StyledSellAction,
} from "./TradeControl.styled";

type Props = {
  presentPrice?: HistoricalPrice;
  presentLedger?: HistoricalLedger;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const TradeControl: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    handleOrder,
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

  if (!presentPrice || !presentLedger)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <TradeSlider
        presentLedger={presentLedger}
        presentPrice={presentPrice}
        shareCount={shareCount}
        shareModifier={shareModifier}
        setShareAmount={setShareAmount}
      />
      <StyledGrid>
        <StyledBuyAction
          handleToggle={handleToggle}
          handleOrder={handleOrder}
          shareCount={shareCount}
          sharePrice={presentPrice.close}
          activeModifier={shareModifier}
        />
        <StyledSellAction
          handleToggle={handleToggle}
          handleOrder={handleOrder}
          shareCount={shareCount}
          sharePrice={presentPrice.close}
          activeModifier={shareModifier}
        />
      </StyledGrid>
    </StyledContainer>
  );
};

export default TradeControl;
