import React from "react";

import HistoricalRow from "./HistoricalRow";
import PresentRow from "./PresentRow";
import {
  StyledTableBody,
} from "./TableBody.styled";

type Props = {
};

const TableBody: React.FC<Props> = (
  props,
) =>
{
  return (
    <StyledTableBody>
      <PresentRow />
      <HistoricalRow />
    </StyledTableBody>
  );
};

export default TableBody;
