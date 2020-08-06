import React from "react";
import {
  BaseProvider, BaseProviderOverrides, DarkTheme,
} from "baseui/dist";
import { Override } from "baseui/dist/overrides";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

const engine = new Styletron();

const AppContainer: Override<unknown> = { style: {
  height: "100%",
  width: "100%",
} };

const overrides: BaseProviderOverrides = { AppContainer };

const BaseUI: React.FC = (props) =>
{
  return (
    <StyletronProvider value={engine}>
      <BaseProvider
        overrides={overrides}
        theme={DarkTheme}
      >
        {props.children}
      </BaseProvider>
    </StyletronProvider>
  );
};

export default BaseUI;
