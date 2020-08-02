import { Block, BlockProps } from "baseui/dist/block";
import { FlexGridItemProps } from "baseui/dist/flex-grid";
import React, { forwardRef } from "react";

type DivProps = FlexGridItemProps | BlockProps;
type Props = DivProps & {
  component?: React.FC<DivProps>;
};

export const AspectRatioItem: React.FC<Props> = forwardRef(
  (
    {
      component: Component = Block, children, ...props
    }, ref,
  ) => (
    <Component
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      {...props}
    >
      {children}
    </Component>
  ),
);

export const AspectRatioBox: React.FC<Props> = forwardRef(
  (
    {
      component: Component = Block, children, ...props
    }, ref,
  ) => (
    <Component
      ref={ref}
      height={0}
      paddingBottom={[
        "100%",
        "75%",
        "56.25%",
      ]}
      position="relative"
      {...props}
    >
      {children}
    </Component>
  ),
);
