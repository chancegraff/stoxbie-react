import { Button, SIZE } from "baseui/dist/button";
import React from "react";
import { styled } from "styletron-react";

type Props = {
  handleContinue: () => void;
};

const FullButton = styled(Button,
{
  width: "100%"
});

const TimeControl: React.FC<Props> = ({ handleContinue }) => (
  <FullButton size={SIZE.large} onClick={handleContinue}>
    {"Continue"}
  </FullButton>
);

export default TimeControl;
