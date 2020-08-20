import React, {
  useMemo,
} from "react";
import {
  Box,
  Button,
  Text,
} from "grommet";
import {
  HistoricalPrice,
} from "iex";

import {
  DateFormats, formatDate,
} from "utils/Utilities";

type Props = {
  currentPrice?: HistoricalPrice;
  handleContinue: () => void;
};

const TimeControl: React.FC<Props> = (
  {
    handleContinue,
    currentPrice,
  },
) =>
{
  const safeDate = useMemo(
    () =>
    {
      if (currentPrice)
      {
        return formatDate(
          currentPrice.date,
          DateFormats.Full,
        );
      }
    },
    [
      currentPrice,
    ],
  );

  return (
    <Box
      align="center"
      justify="center"
      direction="column"
    >
      <Text
        size="small"
        weight="bold"
        margin={
          {
            bottom: "10px",
          }
        }
      >
        {`Today is ${safeDate || "..."}`}
      </Text>
      <Button
        primary={true}
        size="large"
        label="Continue"
        fill="horizontal"
        onClick={handleContinue}
      />
    </Box>
  );
};

export default TimeControl;
