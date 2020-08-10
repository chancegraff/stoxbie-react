import React from "react";
import { render } from "@testing-library/react";

import BaseUI from "services/BaseUI";

export const renderWithBaseUI = (children) =>
{
  return {
    ...render((
      <BaseUI>
        {children}
      </BaseUI>
    )),
  };
};
