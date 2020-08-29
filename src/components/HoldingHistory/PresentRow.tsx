import React, {
  forwardRef,
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import CloseHoldings from "./CloseHoldings";
import {
  StyledTableCell,
  StyledTableRow,
} from "./PresentRow.styled";

type Props = {
  presentHolding: HistoricalTradeStarted;
  presentLedger: HistoricalLedger;
  presentPrice: HistoricalPrice;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      presentHolding,
      presentLedger,
      presentPrice,
      handleSubmit,
    },
    tableRowRef,
  ) =>
  {
    const shares = useMemo(
      () =>
      {
        return formatCount(
          presentLedger.totalCount,
        );
      },
      [
        presentLedger,
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
        return formatCurrency(
          presentHolding.openPrice * presentLedger.totalCount,
        );
      },
      [
        presentHolding,
        presentLedger,
      ],
    );

    return (
      <StyledTableRow
        ref={tableRowRef}
        role="row"
      >
        <StyledTableCell>
          {shares}
        </StyledTableCell>
        <StyledTableCell>
          {open}
        </StyledTableCell>
        <StyledTableCell>
          <CloseHoldings
            presentLedger={presentLedger}
            presentPrice={presentPrice}
            presentHolding={presentHolding}
            handleSubmit={handleSubmit}
          />
        </StyledTableCell>
        <StyledTableCell>
          {balance}
        </StyledTableCell>
      </StyledTableRow>
    );
  },
);

export default PresentRow;
