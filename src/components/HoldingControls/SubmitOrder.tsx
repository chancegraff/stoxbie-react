import React from "react";
import {
  JSXButtonProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetButton,
} from "./SubmitOrder.styled";

type Props = JSXButtonProps & {
  handleSubmit: () => void;
};

export type SubmitOrderProps = Props;

const SubmitOrder: React.FC<Props> = (
  {
    children,
    handleSubmit,
    ...props
  },
) =>
{
  return (
    <GrommetButton
      css=""
      label={children}
      data-testid="exit"
      onClick={handleSubmit}
      {...props}
    />
  );
};

export default SubmitOrder;
