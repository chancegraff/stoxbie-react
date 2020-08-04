import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Grid as LayoutGrid } from "baseui/dist/layout-grid";
import React from "react";

type Props = unknown;

const ContentContainer: React.FC<Props> = (
  props,
) => {
  const [
    , theme,
  ] = useStyletron();

  return (
    <Block
      height="100%"
      padding={[
        `${theme.sizing.scale200} 0`,
        `${theme.sizing.scale400} 0`,
        `${theme.sizing.scale800} 0`,
        `${theme.sizing.scale1200} 0`,
      ]}
    >
      <LayoutGrid>
        {props.children}
      </LayoutGrid>
    </Block>
  );
};

export default ContentContainer;
