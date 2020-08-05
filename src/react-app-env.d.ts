/// <reference types="react-scripts" />
/// <reference types="@vx/axis" />

declare type PropsWithClass = {
  className?: string;
};

declare type PropsWithChildren = {
  children: React.ReactNode;
};

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare type HorizontalPadding = number;
declare type VerticalPadding = number;
declare type Padding = [HorizontalPadding, VerticalPadding];

declare type Width = number;
declare type Height = number;
declare type Resolution = [Width, Height];

declare type DispatchSetStateAction<P> = React.Dispatch<
  React.SetStateAction<P>
>;

declare type HistoricalTrade = {
  ticker: string;
  date: Date;
  openBalance: number;
  open?: number;
  openDate?: Date;
  close?: number;
  closeBalance?: number;
  closeDate?: Date;
  changePrice?: number;
  changePercent?: number;
  changeBalance?: number;
};
