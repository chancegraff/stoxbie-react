/// <reference types="react-scripts" />
/// <reference types="@vx/axis" />

type ColorType = import(
  "grommet/utils"
).ColorType;

declare type DefaultBoxProps = import(
  "grommet"
).BoxProps;

declare type DefaultImageProps = import(
  "grommet"
).ImageProps;

declare type DefaultTextProps = import(
  "grommet"
).TextProps;

declare type DefaultAvatarProps = import(
  "grommet"
).AvatarProps;

declare type DefaultButtonProps = import(
  "grommet"
).ButtonProps;

declare type DefaultGridProps = import(
  "grommet"
).GridProps;

declare type DefaultRangeInputProps = import(
  "grommet"
).RangeInputProps;

declare type DefaultThemeType = import(
  "grommet"
).ThemeType;

declare type DefaultIconProps = import(
  "grommet-icons"
).IconProps;

declare type BoxProps = DefaultBoxProps & Omit<JSX.IntrinsicElements["div"], "ref">;

declare type ImageProps = DefaultImageProps & Omit<JSX.IntrinsicElements["img"], "ref">;

declare type TextProps = DefaultTextProps & JSX.IntrinsicElements["span"];

declare type AvatarProps = DefaultBoxProps & DefaultAvatarProps & JSX.IntrinsicElements["div"];

declare type ButtonProps = DefaultButtonProps & Omit<JSX.IntrinsicElements["button"], "color" | "ref">;

declare type GridProps = DefaultGridProps & JSX.IntrinsicElements["div"];

declare type RangeInputProps = DefaultRangeInputProps & JSX.IntrinsicElements["input"];

declare type ThemeType = DefaultThemeType & {
  name?: string;
  rounding?: number;
  spacing?: number;
  defaultMode?: "dark" | "light";
  scale?: number;
  dark?: boolean;
  baseBackground?: ColorType;
};

declare type IconProps = DefaultIconProps & React.SVGProps<SVGSVGElement>;

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
};

declare type HistoricalTradeOpen = {
  openPrice: number;
  openCount: number;
  openBalance: number;
  openDate: Date;
  openModifier: -1 | 1;
};

declare type HistoricalTradeClose = {
  closePrice: number;
  closeCount: number;
  closeBalance: number;
  closeDate: Date;
  closeModifier: -1 | 1;
};

declare type HistoricalTradeChange = {
  changePrice: number;
  changePercent: number;
  changeBalance: number;
}

declare type HistoricalLedger = {
  totalBalance: number;
  totalReturns: number;
  totalChange: number;
  totalCount: number;
}

declare type HistoricalTrade = HistoricalTradeBase & Partial<HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange>;
declare type HistoricalTradeStarted = HistoricalTradeBase & HistoricalTradeOpen & Partial<HistoricalTradeClose & HistoricalTradeChange>;
declare type HistoricalTradeFinished = HistoricalTradeBase & HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange;
