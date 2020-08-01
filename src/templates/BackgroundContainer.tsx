import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import React from "react";

type Props = unknown;

const BackgroundContainer: React.FC<Props> = (
  props,
) => {
  const [, theme] = useStyletron();

  return (
    <Block
      backgroundColor={theme.colors.backgroundPrimary}
      color={theme.colors.contentPrimary}
      width="100%"
      height="100%"
    >
      {props.children}
    </Block>
  );
};

export default BackgroundContainer;
