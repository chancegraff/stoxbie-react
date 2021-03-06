import React, {
  PropsHasClass,
} from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import Theme from "theme";

const AppTheme: React.FC<PropsHasClass> = (
  props,
) =>
{
  return (
    <GrommetProvider
      css=""
      full={true}
      cssVars={true}
      theme={Theme}
      themeMode="dark"
      {...props}
    />
  );
};

export default AppTheme;
