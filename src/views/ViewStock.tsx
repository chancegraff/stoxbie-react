import React, { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, useParams } from "react-router-dom";
import { Display3 } from "baseui/dist/typography";
import {
  logo as getLogo,
  company as getCompany,
  Logo,
  Company,
} from "iex-cloud";
import ScrollToTop from "services/ScrollToTop";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import RewindCalendar from "components/RewindCalendar";
import StockName from "components/StockName";

type Props = unknown;

const Stock: React.FC = () => {
  const { ticker } = useParams();

  const [logo, setLogo] = useState<Logo>();
  const [company, setCompany] = useState<Company>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleLoad = async () => {
      const nextCompany = await getCompany(ticker);
      const nextLogo = await getLogo(ticker);
      setLogo(nextLogo);
      setCompany(nextCompany);
      setIsLoading(false);
    };
    handleLoad();
    return () => {
      setLogo(undefined);
      setCompany(undefined);
    };
  }, [ticker]);

  if (!isLoading && (!logo || !company)) {
    return (
      <Display3>There was an error loading the stock you requested.</Display3>
    );
  }

  return (
    <>
      <ScrollToTop />
      <BreadcrumbContainer />
      <StockName logo={logo} company={company} />
      <RewindCalendar />
    </>
  );
};

const ViewStock: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <ContentContainer>
      <Switch>
        <Route path={`${match.path}/:ticker`}>
          <Stock />
        </Route>
        <Route path={match.path}>
          <Display3>Please select a stock to view.</Display3>
        </Route>
      </Switch>
    </ContentContainer>
  );
};

export default ViewStock;
