import React from 'react';
import {Client as Styletron} from "styletron-engine-atomic";
import {Provider as StyletronProvider} from "styletron-react";
import {LightTheme, BaseProvider} from 'baseui';
import { Container } from './components/Base';
import TradeStock from './views/TradeStock';
import styles from './App.module.scss';

const engine = new Styletron();

const App: React.FC = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Container className={styles.App}>
        <TradeStock />
      </Container>
    </BaseProvider>
  </StyletronProvider>
);

export default App;
