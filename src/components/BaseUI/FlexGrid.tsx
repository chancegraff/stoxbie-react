import { BlockOverrides } from "baseui/dist/block";
import {
  FlexGrid as DefaultFlexGrid,
  FlexGridItem,
  FlexGridItemProps,
  FlexGridProps,
} from "baseui/dist/flex-grid";
import { Overrides } from "baseui/dist/overrides";
import { Theme } from "baseui/dist/theme";
import React from "react";
import { StyleObject } from "styletron-react";

type Props = FlexGridProps;

export const COLUMN_COUNT = 2;

export const MultiplyWidth = (
  multiple = 2,
): Overrides<BlockOverrides> => {
  return {
    Block: {
      style: (
        {
          $theme,
        }: { $theme: Theme },
      ): StyleObject => {
        return {
          width: `calc((${100 * multiple}% - ${
            $theme.sizing.scale800
          }) / ${COLUMN_COUNT}px)`,
        };
      },
    },
  };
};

export const FlexGridItemFull: React.FC<FlexGridItemProps> = (
  {
    children,
    ...props
  },
) => {
  return (
    <FlexGridItem
      {...props}
      overrides={MultiplyWidth()}
    >
      {children}
    </FlexGridItem>
  );
};

const FlexGrid: React.FC<Props> = (
  {
    children,
    ...props
  },
) => {
  return (
    <DefaultFlexGrid
      flexGridColumnCount={[
        1,
        1,
        COLUMN_COUNT,
        COLUMN_COUNT,
      ]}
      flexGridColumnGap="20px"
      flexGridRowGap="20px"
      width="100%"
      {...props}
    >
      {children}
    </DefaultFlexGrid>
  );
};

export default FlexGrid;
