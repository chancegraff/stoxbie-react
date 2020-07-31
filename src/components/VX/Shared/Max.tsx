import React, { useMemo } from "react";
import { BOTTOM_AXIS_HEIGHT } from "components/VX/LineChart/AxisBottom";
import { RIGHT_AXIS_WIDTH } from "components/VX/LineChart/AxisRight";

export type MaxX = number;
export type MaxY = number;
export type Max = [MaxX, MaxY];

type InjectedProps = {
  max: Max;
};

type MaxProps = {
  resolution: Resolution;
  padding: Padding;
};

type Props = InjectedProps & MaxProps;

const xMaxCreator = (width: number, horizontalPadding: number) =>
  width - horizontalPadding * 2 - RIGHT_AXIS_WIDTH;

const yMaxCreator = (height: number, verticalPadding: number) =>
  height - verticalPadding * 2 - BOTTOM_AXIS_HEIGHT;

const withMax = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>
): React.FC<P> => (props) => {
  const {
    resolution: [width, height],
    padding: [horizontalPadding, verticalPadding],
  } = props;
  const xMax = useMemo(() => xMaxCreator(width, horizontalPadding), [
    width,
    horizontalPadding,
  ]);
  const yMax = useMemo(() => yMaxCreator(height, verticalPadding), [
    height,
    verticalPadding,
  ]);
  return <WrappedChart {...(props as P)} max={[xMax, yMax]} />;
};

export default withMax;
