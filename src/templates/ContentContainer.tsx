import React from "react";
import { FlexGrid, FlexGridProps } from "baseui/dist/flex-grid";
import { Grid as LayoutGrid } from "baseui/dist/layout-grid";
import { Block } from "baseui/dist/block";
import { useStyletron } from "baseui/dist";

type Props = {
  flexGrid?: FlexGridProps;
};

const ContentContainer: React.FC<Props> = (props) => {
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
      <LayoutGrid>
        <FlexGrid
          width="100%"
          flexGridColumnCount={2}
          flexGridColumnGap="scale800"
          flexGridRowGap="scale800"
          {...props.flexGrid}
        >
          {props.children}
        </FlexGrid>
      </LayoutGrid>
    </Block>
  );
};

export default ContentContainer;
