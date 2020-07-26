import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";

type Props = unknown;

const BackgroundContainer: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  return (
    <Block
      backgroundColor={theme.colors.backgroundPrimary}
      color={theme.colors.contentPrimary}
      padding={theme.sizing.scale800}
      height="100%"
    >
      {props.children}
    </Block>
  );
};

export default BackgroundContainer;
