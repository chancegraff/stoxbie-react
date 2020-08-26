import React, {
  PropsHasChildren,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import Grommet from "services/Grommet";

const AppBoilerplate: React.FC<PropsHasChildren> = (
  props,
) =>
{
  return (
    <Grommet>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </Grommet>
  );
};

export default AppBoilerplate;
