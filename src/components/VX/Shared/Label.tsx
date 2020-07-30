import React from "react";
import { TextProps } from "@vx/text/lib/Text";
import { Theme } from "baseui/dist/theme";

export type AxisLabelProps = Partial<TextProps>;
export type TickLabelProps = () => Partial<TextProps>;
export type Label = [AxisLabelProps, TickLabelProps];

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

type InjectedProps = {
  label: Label;
};

type LabelProps = {
  theme: Theme;
};

type Props = InjectedProps & LabelProps;

const withLabel = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>
): React.FC<P> => (props) => (
  <WrappedChart
    {...(props as P)}
    label={[getLabelProps(props.theme), getTickLabelProps(props.theme)]}
  />
);

export default withLabel;
