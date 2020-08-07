import React, { forwardRef } from "react";
import {
  Block, BlockProps,
} from "baseui/dist/block";
import { FlexGridItemProps } from "baseui/dist/flex-grid";

type DivProps = FlexGridItemProps | BlockProps;
type Props = DivProps & {
  component?: React.FC<DivProps>;
};

export const AspectRatioItem: React.FC<Props> = forwardRef((
  {
    component: Component = Block,
    children,
    ...props
  },
  ref,
) =>
{
  return (
    <Component
      alignItems="center"
      bottom={0}
      display="flex"
      height="100%"
      justifyContent="center"
      left={0}
      position="absolute"
      ref={ref}
      right={0}
      top={0}
      width="100%"
      {...props}
    >
      {children}
    </Component>
  );
});

export const AspectRatioBox: React.FC<Props> = forwardRef((
  {
    component: Component = Block,
    children,
    ...props
  },
  ref,
) =>
{
  return (
    <Component
      height={0}
      paddingBottom={
        [
          "100%",
          "75%",
          "56.25%",
        ]
      }
      position="relative"
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
});
