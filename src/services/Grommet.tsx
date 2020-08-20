import React from "react";
import {
  AvatarProps as DefaultAvatarProps,
  BoxProps as DefaultBoxProps,
  ButtonProps as DefaultButtonProps,
  Grommet as GrommetProvider,
  ImageProps as DefaultImageProps,
  TextProps as DefaultTextProps,
  ThemeValue,
} from "grommet";

import Theme from "theme";
import {
  SkeletonProps as DefaultSkeletonProps,
} from "components/Grommet/Skeleton";

export type ButtonProps = DefaultButtonProps & Omit<JSX.IntrinsicElements["button"], "color" | "ref">;

export type TextProps = DefaultTextProps & Omit<JSX.IntrinsicElements["span"], "color" | "ref">;

export type BoxProps = DefaultBoxProps & Omit<JSX.IntrinsicElements["div"], "ref">;

export type ImageProps = DefaultImageProps & Omit<JSX.IntrinsicElements["img"], "ref">;

export type AvatarProps = DefaultBoxProps & DefaultAvatarProps & Omit<JSX.IntrinsicElements["div"], "ref">;

export type SkeletonProps = DefaultSkeletonProps & Omit<JSX.IntrinsicElements["div"], "ref">;

export type ThemeContextProps = { value: ThemeValue };

const Grommet: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider
      full={true}
      theme={Theme}
      themeMode="dark"
    >
      {props.children}
    </GrommetProvider>
  );
};

export default Grommet;
