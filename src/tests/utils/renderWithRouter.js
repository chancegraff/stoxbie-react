import React from "react";
import {
  MemoryRouter,
  Route,
} from "react-router-dom";

export const renderWithRouter = (
  ui,
  path = "/",
  route = "/",
) =>
{
  return (
    <MemoryRouter
      initialEntries={
        [
          route,
        ]
      }
    >
      <Route path={path}>
        {ui}
      </Route>
    </MemoryRouter>
  );
};
