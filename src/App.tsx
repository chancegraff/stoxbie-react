import React from 'react';
import {Client as Styletron} from "styletron-engine-atomic";
import {Provider as StyletronProvider} from "styletron-react";
import {DarkTheme, BaseProvider} from 'baseui';
import TradeShares from './views/TradeShares';
import { Container } from './components/Base';
import styles from './App.module.scss';

const engine = new Styletron();

const AppContainer: React.FC = (props) => {
  return (
    <Container className={styles.App}>
      {props.children}
    </Container>
  );
};

const overrides = {
  AppContainer,
};

const App: React.FC = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={DarkTheme} overrides={overrides}>
      <TradeShares />
    </BaseProvider>
  </StyletronProvider>
);

export default App;
