import { BOTTOM_LABELS_HEIGHT } from "components/VX/LineChart/AxisBottom";
import { RIGHT_LABELS_WIDTH } from "components/VX/LineChart/AxisRight";
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

const xMaxCreator = (
  width: number, horizontalPadding: number,
) => {
  return width - RIGHT_LABELS_WIDTH - horizontalPadding * 2;
};

const yMaxCreator = (
  height: number, verticalPadding: number,
) => {
  return height - BOTTOM_LABELS_HEIGHT - verticalPadding * 2;
};

const withMax = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>,
): React.FC<P> => {
  return (
    props,
  ) => {
    const {
      resolution: [
        width,
        height,
      ],
      padding: [
        horizontalPadding,
        verticalPadding,
      ],
    } = props;
    const xMax = useMemo(
      () => {
        return xMaxCreator(
          width,
          horizontalPadding,
        );
      },
      [
        width,
        horizontalPadding,
      ],
    );
    const yMax = useMemo(
      () => {
        return yMaxCreator(
          height,
          verticalPadding,
        );
      },
      [
        height,
        verticalPadding,
      ],
    );

    return (
      <WrappedChart
        {...(props as P)}
        max={[
          xMax,
          yMax,
        ]}
      />
    );
  };
};

export default withMax;
