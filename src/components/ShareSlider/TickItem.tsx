import React, {
  PropsHasChildren,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetTick,
} from "./TickItem.styled";

type Props = PropsHasChildren & {
  margin: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const TickItem: React.FC<Props> = (
  props,
) =>
{
  return (
    <GrommetTick
      css=""
      {...props}
    />
  );
};

export default TickItem;
