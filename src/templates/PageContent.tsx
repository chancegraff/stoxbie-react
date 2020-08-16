import React from "react";
import {
  Grid as LayoutGrid,
} from "baseui/dist/layout-grid";
import {
  Box,
} from "grommet";

type Props = unknown;

const ContentContainer: React.FC<Props> = (
  props,
) =>
{
  return (
    <Box
      height="100%"
      pad="medium"
    >
      <LayoutGrid>
        {props.children}
      </LayoutGrid>
    </Box>
  );
};

export default ContentContainer;
