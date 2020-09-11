import React, {
  PropsHasChildren,
} from "react";
import {
  MemoryRouter,
  Route,
} from "react-router-dom";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Grommet,
} from "grommet";
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
        <MemoryRouter
          initialEntries={
            [
              route,
            ]
          }
        >
          <Route path={path}>
            {children}
          </Route>
        </MemoryRouter>
      </RecoilRoot>
    </Grommet>
  );
};

export default Boilerplate;
