import React from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";

import Theme from "theme";

const Grommet: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider
      full={true}
      theme={Theme}
      themeMode="dark"
    >
      {props.children}
    </GrommetProvider>
  );
};

export default Grommet;
