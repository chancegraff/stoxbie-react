import React from "react";
import {
  FlexGrid as DefaultFlexGrid,
  FlexGridProps,
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
      }) / ${COLUMN_COUNT})`,
    }),
  },
});

const FlexGrid: React.FC<Props> = ({ children, ...props }) => {
  return (
    <DefaultFlexGrid
      width="100%"
      flexGridColumnCount={COLUMN_COUNT}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
      {...props}
    >
      {children}
    </DefaultFlexGrid>
  );
};

export default FlexGrid;
