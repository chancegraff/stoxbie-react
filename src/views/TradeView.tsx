import React from "react";
import ScrollToTop from "services/ScrollToTop";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import LineChart from "components/LineChart";
import TradeInput from "components/TradeInput";
import { Block } from "baseui/dist/block";

type Props = unknown;

const TradeView: React.FC<Props> = () => {
  return (
    <Block>
      <ScrollToTop />
      <BreadcrumbContainer />
      <LineChart />
      <TradeInput />
    </Block>
  );
};

export default TradeView;
