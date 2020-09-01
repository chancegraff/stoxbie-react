import React, {
  forwardRef,
  PropsHasChildren,
  PropsHasClass,
  useMemo,
} from "react";
import {
} from "@chancey/iex-cloud";
import {
  JSXTableCellProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  StyledTableCell,
  StyledTableRow,
} from "./PresentRow.styled";

type Props = PropsHasChildren & PropsHasClass & {
  presentHolding: HistoricalTradeStarted;
  presentLedger?: HistoricalLedger;
  TableCell?: React.FC<JSXTableCellProps>;
};

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      children,
      className,
      presentHolding,
      presentLedger,
      TableCell = StyledTableCell,
    },
    tableRowRef,
  ) =>
  {
    const shares = useMemo(
      () =>
      {
        if (presentLedger)
        {
          return formatCount(
            presentLedger.totalCount,
          );
        }

        return formatCount(
          presentHolding.openCount,
        );
      },
      [
        presentLedger,
        presentHolding,
      ],
    );
    const open = useMemo(
      () =>
      {
        return formatCurrency(
          presentHolding.openPrice,
        );
      },
      [
        presentHolding,
      ],
    );
    const balance = useMemo(
      () =>
      {
        if (presentLedger)
        {
          return formatCurrency(
            presentHolding.openPrice * presentLedger.totalCount,
          );
        }

        return formatCurrency(
          presentHolding.openPrice * presentHolding.openCount,
        );
      },
      [
        presentLedger,
        presentHolding,
      ],
    );

    return (
      <StyledTableRow
        ref={tableRowRef}
        className={className}
        css=""
        role="row"
      >
        <TableCell>
          {shares}
        </TableCell>
        <TableCell>
          {open}
        </TableCell>
        <TableCell>
          {children}
        </TableCell>
        <TableCell>
          {balance}
        </TableCell>
      </StyledTableRow>
    );
  },
);

export default PresentRow;
