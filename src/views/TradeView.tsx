import React from "react";
import { HistoricalPrice } from "iex-cloud";
import ContentContainer from "templates/ContentContainer";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import LineChart from "components/LineChart";
import TradeInput from "components/TradeInput";
import Error from "components/BaseUI/Typography";

type Props = {
  prices?: Partial<HistoricalPrice>[];
  error?: string;
};

const TradeView: React.FC<Props> = (props) => {
  if (props.error) {
    return <Error>{props.error}</Error>;
  }
  return (
    <ContentContainer>
      <BreadcrumbContainer />
      <LineChart prices={props.prices} />
      <TradeInput />
    </ContentContainer>
  );
};

export default TradeView;
