import React from "react";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";

type Props = unknown;

const BackgroundContainer: React.FC<Props> = (props) =>
{
  const [
    , theme,
  ] = useStyletron();

  return (
    <Block
      backgroundColor={theme.colors.backgroundPrimary}
      color={theme.colors.contentPrimary}
      height="100%"
      width="100%"
    >
      {props.children}
    </Block>
  );
};

export default BackgroundContainer;
