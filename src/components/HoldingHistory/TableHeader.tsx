import React from "react";

import {
  StyledTableHeadCell,
  StyledTableHeader,
  StyledTableRow,
} from "./TableHeader.styled";

type Props = {
};

const TableHeader: React.FC<Props> = (
  props,
) =>
{
  return (
    <StyledTableHeader>
      <StyledTableRow>
        <StyledTableHeadCell>
          Shares
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          Open
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          Close
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          Equity
        </StyledTableHeadCell>
      </StyledTableRow>
    </StyledTableHeader>
  );
};

export default TableHeader;
