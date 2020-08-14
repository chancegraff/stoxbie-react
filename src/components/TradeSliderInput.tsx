import React, {
  useCallback,
} from "react";

type Props = {
  purchaseAmount: number;
  maxValue: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSliderInput: React.FC<Props> = (
  {
    purchaseAmount,
    maxValue,
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
        maxValue,
      );

      setPurchaseAmount(
        shareCount,
      );
    },
    [
      setPurchaseAmount,
      maxValue,
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
