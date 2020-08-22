import {
  AvatarProps,
  BoxProps,
  ButtonProps,
  GridProps,
  ImageProps,
  TextProps,
  ThemeType,
} from "grommet";
import {
  DeepRequired,
} from "util-types";

declare module "grommet" {
  declare type JSXBoxProps = BoxProps & Omit<JSX.IntrinsicElements["div"]>;
  declare const Box: React.FC<JSXBoxProps>;

  declare type JSXImageProps = ImageProps & Omit<JSX.IntrinsicElements["img"]>;
  declare const Image: React.FC<JSXImageProps>;

  declare type JSXTextProps = TextProps & JSX.IntrinsicElements["span"];
  declare const Text: React.FC<JSXTextProps>;

  declare type JSXAvatarProps = AvatarProps & JSX.IntrinsicElements["div"];
  declare const Avatar: React.FC<JSXAvatarProps>;

  declare type JSXButtonProps = ButtonProps & Omit<JSX.IntrinsicElements["button"], "color">;
  declare const Button: React.FC<JSXButtonProps>;

  declare type JSXGridProps = GridProps & JSX.IntrinsicElements["div"];
  declare const Grid: React.FC<JSXGridProps>;

  declare type JSXRangeInputProps = RangeInputProps & JSX.IntrinsicElements["input"];
  declare const RangeInput: React.FC<JSXRangeInputProps>;

  declare interface ThemeProps extends DeepRequired<ThemeType> {}
}
