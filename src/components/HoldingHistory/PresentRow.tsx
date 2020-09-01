import React, {
  forwardRef,
  PropsHasClass,
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

type Props = PropsHasFunctionChild & PropsHasClass & {
  presentHolding: HistoricalTradeStarted;
  presentLedger?: HistoricalLedger;
};

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      children,
      className,
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
      <GrommetTableRow
        ref={tableRowRef}
        className={className}
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
