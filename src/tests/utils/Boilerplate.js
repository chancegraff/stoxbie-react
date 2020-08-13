import React from "react";
import {
  MemoryRouter,
  Route,
} from "react-router-dom";
import BaseUI from "utils/BaseUI";

const Boilerplate = (
  {
    children,
    path = "/",
    route = "/",
  },
) =>
{
  return (
    <BaseUI>
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
    </BaseUI>
  );
};

export default Boilerplate;
