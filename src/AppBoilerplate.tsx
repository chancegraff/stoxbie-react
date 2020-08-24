import React, {
  PropsHasChildren,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import BaseUI from "services/BaseUI";
import Grommet from "services/Grommet";

const AppBoilerplate: React.FC<PropsHasChildren> = (
  props,
) =>
{
  return (
    <Grommet>
      <BrowserRouter>
        <BaseUI>
          {props.children}
        </BaseUI>
      </BrowserRouter>
    </Grommet>
  );
};

export default AppBoilerplate;
