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

declare type HistoricalTradeBase = {
  ticker: string;
  date: Date;
  count: number;
  type: "buy" | "sell";
};

declare type HistoricalTradeOpen = {
  open: number;
  openDate: Date;
  openBalance: number;
};

declare type HistoricalTradeClose = {
  close: number;
  closeBalance: number;
  closeDate: Date;
};

declare type HistoricalTradeChange = {
  changePrice: number;
  changePercent: number;
  changeBalance: number;
}

declare type HistoricalLedger = {
  totalBalance: number;
  totalChange: number;
}

declare type HistoricalTrade = HistoricalTradeBase & Partial<HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange>;
declare type HistoricalTradeStarted = HistoricalTradeBase & HistoricalTradeOpen & Partial<HistoricalTradeClose & HistoricalTradeChange>;
declare type HistoricalTradeFinished = HistoricalTradeBase & HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange;
