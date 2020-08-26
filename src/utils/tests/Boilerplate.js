import React from "react";
import {
  MemoryRouter,
  Route,
} from "react-router-dom";
import {
  Grommet,
} from "grommet";

const Boilerplate = (
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

export default Boilerplate;
