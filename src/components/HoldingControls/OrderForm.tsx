import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
} from "trade-types";

import {
  handleUnloadCreator,
} from "utils/Utilities";
import Spinner from "components/Grommet/Spinner";
import ChooseShares from "components/ShareSlider/ChooseShares";

import {
  StyledBuyAction,
  StyledContainer,
  StyledGrid,
  StyledSellAction,
} from "./OrderForm.styled";

type Props = {
  presentPrice?: HistoricalPrice;
  presentLedger?: HistoricalLedger;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const OrderForm: React.FC<Props> = (
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

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setShareAmount,
          setShareModifier,
        ],
      );
    },
    [],
  );

  if (!presentPrice || !presentLedger)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <ChooseShares
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

export default OrderForm;
