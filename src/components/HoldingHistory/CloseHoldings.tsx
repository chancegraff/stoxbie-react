import React, {
  useCallback,
} from "react";
import {
  Holding,
  PresentHoldingType,
} from "holding-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  useHover,
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  GrommetClosedIcon,
  GrommetContainer,
  GrommetOpenedIcon,
  StoxbieSubmitOrder,
} from "./CloseHoldings.styled";

type Props = {
  presentHolding: PresentHoldingType;
  handleClose: (present: Pick<Holding, "ticker" | "present">) => void;
};

const CloseHoldings: React.FC<Props> = (
  {
    presentHolding,
    handleClose,
  },
) =>
{
  const [
    hoverState,
    handleMouseEnter,
    handleMouseLeave,
  ] = useHover();

  const handleSubmit = useCallback(
    () =>
    {
      handleClose(
        presentHolding,
      );
    },
    [
      presentHolding,
      handleClose,
    ],
  );

  return (
    <StoxbieSubmitOrder
      css=""
      handleSubmit={handleSubmit}
    >
      <GrommetContainer
        css=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HoverIcon
          css=""
          hoverState={hoverState}
          MouseIdlingIcon={GrommetOpenedIcon}
          MouseHoveringIcon={GrommetClosedIcon}
        />
      </GrommetContainer>
    </StoxbieSubmitOrder>
  );
};

export default CloseHoldings;
