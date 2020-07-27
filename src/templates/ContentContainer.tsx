import React from "react";
import { Grid } from "baseui/dist/layout-grid";
import { Block } from "baseui/dist/block";
import { useStyletron } from "baseui/dist";

type Props = unknown;

const ContentContainer: React.FC = (props) => {
  const [, theme] = useStyletron();
  return (
    <Block
      padding={[
        `${theme.sizing.scale400} 0`,
        `${theme.sizing.scale400} 0`,
        `${theme.sizing.scale800} 0`,
        `${theme.sizing.scale1200} 0`,
      ]}
      height="100%"
    >
      <Grid gridGaps={theme.grid.gutters}>{props.children}</Grid>
    </Block>
  );
};

export default ContentContainer;
