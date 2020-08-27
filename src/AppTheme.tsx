import React from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";

import Theme from "theme";

const AppTheme: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider
      full={true}
      cssVars={true}
      theme={Theme}
      themeMode="dark"
    >
      {props.children}
    </GrommetProvider>
  );
};

export default AppTheme;
