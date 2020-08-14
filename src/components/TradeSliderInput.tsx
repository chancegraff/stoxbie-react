import React, {
  useCallback,
} from "react";

type Props = {
  shareCount: number;
  maxValue: number;
  setShareAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSliderInput: React.FC<Props> = (
  {
    shareCount,
    maxValue,
    setShareAmount,
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

      setShareAmount(
        shareCount,
      );
    },
    [
      setShareAmount,
      maxValue,
    ],
  );

  return (
    <input
      hidden={true}
      value={shareCount}
      data-testid="sliderInput"
      onChange={handleInputChange}
    />
  );
};

export default TradeSliderInput;
