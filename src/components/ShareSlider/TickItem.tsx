import React, {
  PropsHasChildren,
  PropsHasClass,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetTick,
} from "./TickItem.styled";

type Props = PropsHasChildren & PropsHasClass & {
  margin: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const TickItem: React.FC<Props> = (
  {
    className,
    ...props
  },
) =>
{
  return (
    <GrommetTick
      className={className}
      css=""
      {...props}
    />
  );
};

export default TickItem;
