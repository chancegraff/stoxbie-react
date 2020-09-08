import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  PresentHoldingType,
} from "trade-types";

import {
  useScrollToTop,
} from "utils/Hooks";
import {
  historicalHoldingsState,
  historicalPricesState,
  presentHoldingsState,
} from "store/Atoms";
import {
  highestPresentHoldingState,
  presentLedgerState,
  presentPriceState,
} from "store/Selectors";
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
  chartRef: React.RefObject<HTMLDivElement>;
  chartWidth: number;
  chartHeight: number;
  handleOpen: (orderAmount: number) => void;
  handleClose: (present: PresentHoldingType) => void;
  handleContinue: () => void;
};

const TradeViewDisplay: React.FC<Props> = (
  {
    chartRef,
    chartWidth,
    chartHeight,
    handleOpen,
    handleClose,
    handleContinue,
  },
) =>
{
  const [
    historicalHoldings,
  ] = useRecoilState(
    historicalHoldingsState,
  );
  const [
    historicalPrices,
  ] = useRecoilState(
    historicalPricesState,
  );
  const [
    presentHoldings,
  ] = useRecoilState(
    presentHoldingsState,
  );

  const presentPrice = useRecoilValue(
    presentPriceState,
  );
  const presentLedger = useRecoilValue(
    presentLedgerState,
  );
  const highestPresentHolding = useRecoilValue(
    highestPresentHoldingState,
  );

  useScrollToTop();

  return (
    <PageContent css="">
      <GrommetGrid css="">
        <GrommetContentContainer css="">
          <AspectRatioBox css="">
            <AspectRatioItem
              ref={chartRef}
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
            handleOpen={handleOpen}
          />
          <HoldingTable
            css=""
            presentPrice={presentPrice}
            presentLedger={presentLedger}
            presentHoldings={presentHoldings}
            historicalHoldings={historicalHoldings}
            highestPresentHolding={highestPresentHolding}
            handleClose={handleClose}
          />
        </GrommetSidebarContainer>
      </GrommetGrid>
    </PageContent>
  );
};

export default TradeViewDisplay;
