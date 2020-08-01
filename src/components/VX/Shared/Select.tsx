import { HistoricalPrice } from "iex";
import React from "react";

export type SelectX = (price: HistoricalPrice) => number;
export type SelectY = (price: HistoricalPrice) => number;
export type Select = [SelectX, SelectY];

const xSelector = (
  price: HistoricalPrice,
) => new Date(
  price.date,
).valueOf();
const ySelector = (
  price: HistoricalPrice,
) => price.close;

type InjectedProps = {
  select: Select;
};

type SelectProps = unknown;

type Props = InjectedProps & SelectProps;

const withSelect = <P extends React.PropsWithChildren<Props>>(WrappedChart: React.FC<P>): React.FC<P> => (
  props,
) => (
  <WrappedChart {...(props as P)} select={[
    xSelector,
    ySelector,
  ]} />
);

export default withSelect;
