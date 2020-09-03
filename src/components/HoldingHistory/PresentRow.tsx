import React, {
  forwardRef,
  PropsHasFunctionChild,
  useMemo,
} from "react";
import {
} from "@chancey/iex-cloud";
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
  GrommetTableRow,
} from "./PresentRow.styled";

type Props = PropsHasFunctionChild & {
  presentHolding: HistoricalTradeStarted;
  presentLedger?: HistoricalLedger;
};

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      children,
      presentHolding,
      presentLedger,
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
        return formatCurrency(
          presentHolding.openPrice * presentHolding.openCount,
        );
      },
      [
        presentHolding,
      ],
    );

    return (
      <GrommetTableRow
        ref={tableRowRef}
        css=""
        role="row"
      >
        {
          children(
            {
              shares,
              open,
              balance,
            },
          )
        }
      </GrommetTableRow>
    );
  },
);

export default PresentRow;
