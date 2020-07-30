import React, { useMemo } from "react";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { Theme } from "baseui/dist/theme";
import { Spinner } from "baseui/dist/spinner";
import { Block } from "baseui/dist/block";
import LineChart from "components/VX/LineChart";
import { Label } from "components/VX/Shared/Label";

type Props = {
  prices?: HistoricalPrice[];
  resolution?: Resolution;
};

const getLabelProps = (theme: Theme) => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelSmall,
});
const getTickLabelProps = (theme: Theme) => () => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelXSmall,
});

const StockChart: React.FC<Props> = ({ prices, resolution = [800, 500] }) => {
  const [, theme] = useStyletron();
  const label: Label = useMemo(
    () => [getLabelProps(theme), getTickLabelProps(theme)],
    [theme]
  );
  if (!prices || !prices.length) {
    return (
      <Block
        width={`${resolution[0]}px`}
        height={`${resolution[1]}px`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Block>
    );
  }
  return <LineChart prices={prices} resolution={resolution} label={label} />;
};

export default StockChart;
