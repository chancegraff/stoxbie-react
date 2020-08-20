import {
  BoxProps as DefaultBoxProps,
  ButtonProps as DefaultButtonProps,
  TextProps as DefaultTextProps,
} from "grommet";

export type ButtonProps = DefaultButtonProps & Omit<JSX.IntrinsicElements["button"], "color" | "ref">;

export type TextProps = DefaultTextProps & Omit<JSX.IntrinsicElements["span"], "color" | "ref">;

export type BoxProps = DefaultBoxProps & Omit<JSX.IntrinsicElements["div"], "ref">;
