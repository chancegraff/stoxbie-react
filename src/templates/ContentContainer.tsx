import React from "react";
import { FlexGrid } from "baseui/dist/flex-grid";
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
      <FlexGrid
        flexGridColumnCount={2}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {props.children}
      </FlexGrid>
    </Block>
  );
};

export default ContentContainer;
