import React from "react";
import {
  Switch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import CatchRoute from "routes/CatchRoute";
import ErrorRoute from "routes/ErrorRoute";
import OrderRoute from "routes/OrderRoute";

const AppRoutes: React.FC<unknown> = () =>
{
  return (
    <Switch>
      <ErrorRoute />
      <OrderRoute />
      <CatchRoute />
    </Switch>
  );
};

export default AppRoutes;
