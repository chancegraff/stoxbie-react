import React, { useMemo } from "react";

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

const withMax = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>
): React.FC<P> => (props) => {
  const {
    resolution: [width, height],
    padding: [horizontalPadding, verticalPadding],
  } = props;
  const xMax = useMemo(() => width - horizontalPadding, [
    width,
    horizontalPadding,
  ]);
  const yMax = useMemo(() => height - verticalPadding, [
    height,
    verticalPadding,
  ]);
  return <WrappedChart {...(props as P)} max={[xMax, yMax]} />;
};

export default withMax;
