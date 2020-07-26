import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";

type Props = unknown;

const ContentContainer: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  return (
    <Block
      padding={`${theme.sizing.scale800} 0`}
      margin={[
        `0 ${theme.sizing.scale800}`,
        `0 ${theme.sizing.scale1200}`,
        `0 ${theme.sizing.scale1600}`,
        `0 ${theme.sizing.scale3200}`,
      ]}
      height="100%"
    >
      {props.children}
    </Block>
  );
};

export default ContentContainer;
