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

type Props = PropsHasChildren & {
  path: string;
  route: string;
}

export const Boilerplate: React.FC<Props> = (
  {
    children,
    path = "/",
    route = "/",
  },
) =>
{
  return (
    <Grommet>
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
    </Grommet>
  );
};
