import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from "react";

export const copyPropsToChildren = ({
  children,
  ...props
}: PropsWithChildren<unknown>): React.ReactNode =>
  Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

export const parsePixels = (px: string): number =>
  parseInt(px.replace("px", ""));
