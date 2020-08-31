import React, {
  forwardRef,
  PropsHasChildren,
  useMemo,
} from "react";
import {
  JSXTableCellProps,
} from "grommet";
import {
} from "@chancey/iex-cloud";
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

type Props = PropsHasChildren & {
  presentHolding: HistoricalTradeStarted;
  presentLedger?: HistoricalLedger;
  TableCell?: React.FC<JSXTableCellProps>;
};

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      children,
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
