import React, {
  PropsHasClass,
} from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";
import {
  useRecoilValue,
} from "recoil";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import Theme from "theme";
import {
  themeState,
} from "store/Atoms";

const AppTheme: React.FC<PropsHasClass> = (
  props,
) =>
{
  const theme = useRecoilValue(
    themeState,
  );

  return (
    <GrommetProvider
      css=""
      full={true}
      cssVars={true}
      theme={Theme}
      themeMode={theme}
      {...props}
    />
  );
};

export default AppTheme;
