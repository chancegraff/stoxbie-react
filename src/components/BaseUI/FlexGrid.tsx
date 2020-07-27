import React from "react";
import {
  FlexGrid as DefaultFlexGrid,
  FlexGridProps,
} from "baseui/dist/flex-grid";

type Props = FlexGridProps;

const FlexGrid: React.FC<Props> = ({ children, ...props }) => {
  return (
    <DefaultFlexGrid
      width="100%"
      flexGridColumnCount={2}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
      {...props}
    >
      {children}
    </DefaultFlexGrid>
  );
};

export default FlexGrid;
