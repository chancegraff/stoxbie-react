import React from "react";

import {
  StyledTableCell,
  StyledTableHeader,
  StyledTableRow,
} from "./TableHeader.styled";

const TableHeader: React.FC = () =>
{
  return (
    <StyledTableHeader>
      <StyledTableRow role="headerRow">
        <StyledTableCell>
          Shares
        </StyledTableCell>
        <StyledTableCell>
          Open
        </StyledTableCell>
        <StyledTableCell>
          Close
        </StyledTableCell>
        <StyledTableCell>
          Equity
        </StyledTableCell>
      </StyledTableRow>
    </StyledTableHeader>
  );
};

export default TableHeader;
