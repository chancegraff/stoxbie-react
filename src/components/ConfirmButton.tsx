import React from "react";
import { Button } from "baseui/button";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
} & PropsWithChildren;

const ConfirmButton: React.FC<Props> = (props) => (
  <Button onClick={props.onClick}>{props.children}</Button>
);

export default ConfirmButton;
