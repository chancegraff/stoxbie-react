import React from 'react';
import {Client as Styletron} from "styletron-engine-atomic";
import {Provider as StyletronProvider} from "styletron-react";
import {DarkTheme, BaseProvider, BaseProviderOverrides} from 'baseui';

const engine = new Styletron();

const WithBaseUI = (WrappedComponent: React.FC, overrides: BaseProviderOverrides): React.FC => () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={DarkTheme} overrides={overrides}>
      <WrappedComponent />
    </BaseProvider>
  </StyletronProvider>
);

export default WithBaseUI;
