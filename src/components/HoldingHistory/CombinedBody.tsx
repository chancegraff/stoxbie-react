import React from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Ledger,
  OpenedHolding,
} from "holding-types";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  CombinedBodyState,
} from "utils/Constants";

import CloseHoldings from "./CloseHoldings";
import {
  GrommetTableBody,
  GrommetTableCell,
} from "./CombinedBody.styled";
import PresentRow from "./PresentRow";

type Props = {
  combinedBodyState: CombinedBodyState;
  presentHoldings: List<OpenedHolding>;
  presentLedger: Ledger | undefined;
  presentPrice: HistoricalPrice | undefined;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const CombinedBody: React.FC<Props> = (
  {
    combinedBodyState,
    presentHoldings,
    presentLedger,
    presentPrice,
    handleOrder,
  },
) =>
{
  if (
    combinedBodyState === CombinedBodyState.Retracting ||
    !presentLedger ||
    !presentPrice
  )
  {
    return null;
  }

  return (
    <GrommetTableBody css="">
      {
        presentHoldings.map(
          (
            presentHolding,
          ) =>
          {
            const {
              open: {
                amount,
                date,
              },
            } = presentHolding;

            return (
              <PresentRow
                key={`${date}-${amount}`}
                css=""
                presentHolding={presentHolding}
              >
                {
                  (
                    {
                      shares,
                      open,
                      balance,
                    }: {
                      shares: string;
                      open: string;
                      balance: string;
                    },
                  ) =>
                  {
                    return (
                      <>
                        <GrommetTableCell css="">
                          {shares}
                        </GrommetTableCell>
                        <GrommetTableCell css="">
                          {open}
                        </GrommetTableCell>
                        <GrommetTableCell css="">
                          <CloseHoldings
                            css=""
                            disabled={true}
                            presentPrice={presentPrice}
                            presentHolding={presentHolding}
                            handleOrder={handleOrder}
                          />
                        </GrommetTableCell>
                        <GrommetTableCell css="">
                          {balance}
                        </GrommetTableCell>
                      </>
                    );
                  }
                }
              </PresentRow>
            );
          },
        )
      }
    </GrommetTableBody>
  );
};

export default CombinedBody;
