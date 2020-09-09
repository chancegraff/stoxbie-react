import React, {
  PropsHasChildren,
} from "react";
import {
  MemoryRouter,
  Route,
} from "react-router-dom";
import {
  Grommet,
} from "grommet";
import {
  RecoilRoot,
} from "recoil";

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
      <RecoilRoot>
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
