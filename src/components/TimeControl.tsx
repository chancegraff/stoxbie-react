import React from "react";
import { SIZE } from "baseui/dist/button";

import { FullButton } from "./TimeControl.styled";

type Props = {
  handleContinue: () => void;
};

const TimeControl: React.FC<Props> = ({ handleContinue }) =>
{
  return (
    <FullButton
      size={SIZE.large}
      onClick={handleContinue}
    >
      Continue
    </FullButton>
  );
};

export default TimeControl;
