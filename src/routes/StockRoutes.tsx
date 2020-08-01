import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import {
  logo as getLogo,
  company as getCompany,
  Logo,
  Company,
} from "iex-cloud";
import Error from "components/BaseUI/Typography";
import ScrollToTop from "services/ScrollToTop";
import StockView from "views/StockView";
import { TICKER_ERROR_MESSAGE } from "services/Constants";
import { handleUnloadCreator } from "services/Utilities";

const ERROR_MESSAGE =
  "There was a problem attempting to load company information about the stock you requested.";

const ViewRoute: React.FC = () => {
  const {
    ticker = "",
  } = useParams<{
    ticker?: string;
  }>();
  const history = useHistory();

  const [
    logo,
    setLogo,
  ] = useState<
    Logo
  >();
  const [
    company,
    setCompany,
  ] = useState<
    Company
  >();
  const [
    error,
    setError,
  ] = useState<
    string
  >();

  const safeTicker = useMemo(() => {
    if (
      ticker
    ) {
      return ticker;
    }
    setError(
      TICKER_ERROR_MESSAGE
    );
  }, [
    ticker,
  ]);

  const handleStart = useCallback(
    (
      date: string
    ) => {
      if (
        company
      ) {
        history.push(
          `/trade/${company.symbol}/${date}`
        );
      }
    },
    [
      history,
      company,
    ]
  );

  const handleLoad = useCallback(
    async (
      ticker?: string
    ) => {
      if (
        ticker
      ) {
        const nextCompany = await getCompany(
          ticker
        );
        const nextLogo = await getLogo(
          ticker
        ).catch();
        if (
          !nextCompany ||
          !nextLogo
        ) {
          setError(
            ERROR_MESSAGE
          );
        } else {
          setLogo(
            nextLogo
          );
          setCompany(
            nextCompany
          );
        }
      }
    },
    []
  );

  useEffect(() => {
    handleLoad(
      safeTicker
    );
  }, [
    handleLoad,
    safeTicker,
  ]);

  useEffect(
    () =>
      handleUnloadCreator(
        [
          setLogo,
          setCompany,
          setError,
        ]
      ),
    []
  );

  return (
    <StockView
      logo={
        logo
      }
      company={
        company
      }
      error={
        error
      }
      handleStart={
        handleStart
      }
    />
  );
};

const StockRoutes: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${match.path}/:ticker`}
      >
        <ScrollToTop />
        <ViewRoute />
      </Route>
      <Route
        path={
          match.path
        }
      >
        <ScrollToTop />
        <Error>
          {`Please select a stock to view.`}
        </Error>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
