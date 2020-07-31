import React from "react";
import { styled } from "styletron-react";
import { Button, SIZE } from "baseui/dist/button";

type Props = unknown;

const FullButton = styled(Button, { width: "100%" });

const TimeControl: React.FC<Props> = () => {
  return <FullButton size={SIZE.large}>Continue</FullButton>;
};

export default TimeControl;
