import React from "react";
import {
  FlexGrid as DefaultFlexGrid,
  FlexGridProps,
  FlexGridItemProps,
  FlexGridItem,
} from "baseui/dist/flex-grid";
import { Overrides } from "baseui/dist/overrides";
import { BlockOverrides } from "baseui/dist/block";
import { StyleObject } from "styletron-react";
import { Theme } from "baseui/dist/theme";

type Props = FlexGridProps;

export const COLUMN_COUNT = 2;

export const MultiplyWidth = (multiple = 2): Overrides<BlockOverrides> => ({
  Block: {
    style: ({ $theme }: { $theme: Theme }): StyleObject => ({
      width: `calc((${100 * multiple}% - ${
        $theme.sizing.scale800
      }) / ${COLUMN_COUNT}px)`,
    }),
  },
});

export const FlexGridItemFull: React.FC<FlexGridItemProps> = ({
  children,
  ...props
}) => (
  <FlexGridItem {...props} overrides={MultiplyWidth()}>
    {children}
  </FlexGridItem>
);

const FlexGrid: React.FC<Props> = ({ children, ...props }) => {
  return (
    <DefaultFlexGrid
      width="100%"
      flexGridColumnCount={[1, 1, COLUMN_COUNT, COLUMN_COUNT]}
      flexGridColumnGap="20px"
      flexGridRowGap="20px"
      {...props}
    >
      {children}
    </DefaultFlexGrid>
  );
};

export default FlexGrid;
