import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalLedger,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";

import {
  AspectRatioBox,
  AspectRatioItem,
} from "components/Grommet/AspectRatio";
import OrderForm from "components/HoldingControls/OrderForm";
import HoldingTable from "components/HoldingHistory/HoldingTable";
import PageContent from "components/PageTemplates/PageContent";
import ForwardTime from "components/TimeControls/ForwardTime";
import StockChart from "components/VX/StockChart";

import {
  GrommetContentContainer,
  GrommetGrid,
  GrommetSidebarContainer,
} from "./TradeViewStyles";

type Props = RouteProps & {
  aspectRatioRef: React.RefObject<HTMLElement>;
  chartWidth: number;
  chartHeight: number;
  historicalPrices: HistoricalPrice[] | undefined;
  historicalHoldings: HistoricalTradeFinished[];
  presentPrice: HistoricalPrice | undefined;
  presentLedger: HistoricalLedger | undefined;
  presentHoldings: HistoricalTradeStarted[];
  highestPresentHolding: HistoricalTradeStarted | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
  handleContinue: () => void;
};

const TradeViewDisplay: React.FC<Props> = (
  {
    aspectRatioRef,
    chartWidth,
    chartHeight,
    historicalPrices,
    historicalHoldings,
    presentPrice,
    presentLedger,
    presentHoldings,
    highestPresentHolding,
    handleSubmit,
    handleContinue,
  },
) =>
{
  return (
    <PageContent css="">
      <GrommetGrid css="">
        <GrommetContentContainer css="">
          <AspectRatioBox css="">
            <AspectRatioItem
              ref={aspectRatioRef}
              css=""
            >
              <StockChart
                css=""
                prices={historicalPrices}
                resolution={
                  [
                    chartWidth,
                    chartHeight,
                  ]
                }
              />
            </AspectRatioItem>
          </AspectRatioBox>
        </GrommetContentContainer>
        <GrommetSidebarContainer
          css=""
          height={
            {
              max: `${chartHeight}px`,
            }
          }
        >
          <ForwardTime
            css=""
            handleContinue={handleContinue}
            presentPrice={presentPrice}
          />
          <OrderForm
            css=""
            presentLedger={presentLedger}
            presentPrice={presentPrice}
            handleSubmit={handleSubmit}
          />
          <HoldingTable
            css=""
            presentPrice={presentPrice}
            presentLedger={presentLedger}
            presentHoldings={presentHoldings}
            historicalHoldings={historicalHoldings}
            highestPresentHolding={highestPresentHolding}
            handleSubmit={handleSubmit}
          />
        </GrommetSidebarContainer>
      </GrommetGrid>
    </PageContent>
  );
};

export default TradeViewDisplay;
