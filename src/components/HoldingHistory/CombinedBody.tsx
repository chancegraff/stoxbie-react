import React, {
  PropsHasClass,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  CombinedBodyState,
} from "utils/Constants";

import CloseHoldings from "./CloseHoldings";
import {
  GrommetTableBody,
  GrommetTableCell,
} from "./CombinedBody.styled";
import PresentRow from "./PresentRow";

type Props = PropsHasClass & {
  combinedBodyState: CombinedBodyState;
  presentHoldings: HistoricalTradeStarted[];
  presentLedger: HistoricalLedger | undefined;
  presentPrice: HistoricalPrice | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CombinedBody: React.FC<Props> = (
  {
    className,
    combinedBodyState,
    presentHoldings,
    presentLedger,
    presentPrice,
    handleSubmit,
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
    <GrommetTableBody
      css=""
      className={className}
    >
      {
        presentHoldings.map(
          (
            presentHolding,
          ) =>
          {
            const {
              openDate,
              openCount,
            } = presentHolding;

            return (
              <PresentRow
                key={`${openDate}-${openCount}`}
                css=""
                presentHolding={presentHolding}
              >
                {
                  (
                    {
                      shares,
                      open,
                      balance,
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
                            presentHolding={presentHolding}
                            presentLedger={presentLedger}
                            presentPrice={presentPrice}
                            handleSubmit={handleSubmit}
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
