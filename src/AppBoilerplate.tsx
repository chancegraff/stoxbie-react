import React from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import BaseUI from "services/BaseUI";
import Grommet from "services/Grommet";

const AppBoilerplate: React.FC<PropsWithChildren> = (
  props,
) =>
{
  return (
    <BrowserRouter>
      <BaseUI>
        <Grommet>
          {props.children}
        </Grommet>
      </BaseUI>
    </BrowserRouter>
  );
};

export default AppBoilerplate;
