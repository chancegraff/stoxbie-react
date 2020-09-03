import React from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetTableCell,
  GrommetTableHeader,
  GrommetTableRow,
} from "./TableHeader.styled";

const TableHeader: React.FC<unknown> = () =>
{
  return (
    <GrommetTableHeader css="">
      <GrommetTableRow
        role="headerRow"
        css=""
      >
        <GrommetTableCell css="">
          Shares
        </GrommetTableCell>
        <GrommetTableCell css="">
          Open
        </GrommetTableCell>
        <GrommetTableCell css="">
          Close
        </GrommetTableCell>
        <GrommetTableCell css="">
          Equity
        </GrommetTableCell>
      </GrommetTableRow>
    </GrommetTableHeader>
  );
};

export default TableHeader;
