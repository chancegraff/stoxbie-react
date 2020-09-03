import React, {
  PropsHasClass,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Padding,
  Resolution,
} from "style-types";

import {
  Label,
} from "components/VX/LineChart";
import withMax, {
  Max,
} from "components/VX/Shared/Max";
import withScale, {
  Scale,
} from "components/VX/Shared/Scale";
import withSelect, {
  Select,
} from "components/VX/Shared/Select";

type BaseProps = PropsHasClass & {
  prices: HistoricalPrice[];
  resolution: Resolution;
  padding: Padding;
  label: Label;
};

type InjectedProps = {
  max: Max;
  scale: Scale;
  select: Select;
};

type Props = BaseProps & InjectedProps;

const withShared = (
  WrappedChart: React.FC<Props>,
): React.FC<BaseProps> =>
{
  return withSelect<Props>(
    withMax<Props>(
      withScale<Props>(
        WrappedChart,
      ),
    ),
  ) as React.FC<
  BaseProps
  >;
};

export default withShared;
