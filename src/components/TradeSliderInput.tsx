import React, {
  useCallback,
} from "react";

type Props = {
  purchaseAmount: number;
  maxPurchasable: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSliderInput: React.FC<Props> = (
  {
    purchaseAmount,
    maxPurchasable,
    setPurchaseAmount,
  },
) =>
{
  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
      const {
        target: {
          value,
        },
      } = event;
      const orderCount = parseInt(
        value,
        10,
      );
      const shareCount = Math.min(
        orderCount,
        maxPurchasable,
      );

      setPurchaseAmount(
        shareCount,
      );
    },
    [
      setPurchaseAmount,
      maxPurchasable,
    ],
  );

  return (
    <input
      hidden={true}
      value={purchaseAmount}
      data-testid="sliderInput"
      onChange={handleInputChange}
    />
  );
};

export default TradeSliderInput;
