import React from "react";
import ScrollToTop from "services/ScrollToTop";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import LineChart from "components/LineChart";
import TradeInput from "components/TradeInput";
import ContentContainer from "templates/ContentContainer";

type Props = unknown;

const TradeView: React.FC<Props> = () => {
  return (
    <ContentContainer>
      <ScrollToTop />
      <BreadcrumbContainer />
      <LineChart />
      <TradeInput />
    </ContentContainer>
  );
};

export default TradeView;
