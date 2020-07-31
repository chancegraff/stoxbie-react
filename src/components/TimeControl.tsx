import React from "react";
import { Button, SIZE } from "baseui/dist/button";

type Props = unknown;

const TimeControl: React.FC<Props> = () => {
  return <Button size={SIZE.large}>Next Day</Button>;
};

export default TimeControl;
