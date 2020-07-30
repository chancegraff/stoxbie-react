import React, { useMemo } from "react";

export type MaxX = number;
export type MaxY = number;
export type Max = [MaxX, MaxY];

type InjectedProps = {
  max: Max;
};

type MaxProps = {
  resolution: Resolution;
};

type Props = InjectedProps & MaxProps;

const withMax = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>
): React.FC<P> => (props) => {
  const {
    resolution: [width, height],
  } = props;
  const xMax = useMemo(() => width - 120, [width]);
  const yMax = useMemo(() => height - 80, [height]);
  return <WrappedChart {...(props as P)} max={[xMax, yMax]} />;
};

export default withMax;
