import React, {
  PropsHasChildren,
  PropsHasClass,
} from "react";

import {
  StyledTick,
} from "./TickItem.styled";

type Props = PropsHasChildren & PropsHasClass & {
  tickMargin: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const TickItem: React.FC<Props> = (
  {
    className,
    ...props
  },
) =>
{
  return (
    <StyledTick
      className={className}
      {...props}
    />
  );
};

export default TickItem;
