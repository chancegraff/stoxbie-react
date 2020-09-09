import React, {
  forwardRef,
  PropsHasFunctionChild,
  useMemo,
} from "react";
import {
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  LedgerType,
  PresentHoldingType,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  GrommetTableRow,
} from "./PresentRow.styled";

type Props = PropsHasFunctionChild<{
  shares: string;
  open: string;
  balance: string;
}> & {
  presentHolding: PresentHoldingType;
  presentLedger?: LedgerType;
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
            presentLedger.amounts.holding,
          );
        }

        return formatCount(
          presentHolding.orders.present.amount * presentHolding.orders.present.direction,
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
          presentHolding.orders.present.price,
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
          presentHolding.orders.present.price * presentHolding.orders.present.amount,
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
