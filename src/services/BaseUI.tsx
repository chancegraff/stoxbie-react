import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider, BaseProviderOverrides } from "baseui";

const engine = new Styletron();

type Props = PropsWithChildren & {
  overrides?: BaseProviderOverrides;
};

const BaseUI: React.FC<Props> = (props) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={DarkTheme} overrides={props.overrides}>
      {props.children}
    </BaseProvider>
  </StyletronProvider>
);

export default BaseUI;
