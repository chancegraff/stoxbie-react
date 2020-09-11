import React, {
  PropsHasChildren,
} from "react";
import {
  MemoryRouter,
  Route,
  Router,
} from "react-router-dom";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Grommet,
} from "grommet";
import {
  createMemoryHistory,
} from "history";
import {
  List,
} from "immutable";
import {
  RecoilRoot,
} from "recoil";

import {
  prices,
} from "tests/Helpers";
import {
  historicalPricesState,
} from "store/Atoms";

type Props = PropsHasChildren & {
  path: string;
  route: string;
}

const Boilerplate: React.FC<Props> = (
  {
    children,
    path = "/",
    route = "/",
  },
) =>
{
  const history = createMemoryHistory(
    {
      initialEntries: [
        route,
      ],
    },
  );

  return (
    <Grommet>
      <RecoilRoot
        initializeState={
          (
            snap,
          ) =>
          {
            return snap.set<List<HistoricalPrice>>(
              historicalPricesState,
              List(
                prices,
              ),
            );
          }
        }
      >
        <Router
          history={history}
        >
          <Route path={path}>
            {children}
          </Route>
        </Router>
      </RecoilRoot>
    </Grommet>
  );
};

export default Boilerplate;
