import React from 'react';
import { Container } from './components/Base';
import ViewContainer from './templates/ViewContainer';
import TradeShares from './views/TradeShares';
import styles from './App.module.scss';
import WithBaseUI from 'services/WithBaseUI';

const AppContainer: React.FC = (props) => (
  <Container className={styles.App}>
    {props.children}
  </Container>
);

const overrides = {
  AppContainer,
};

const App: React.FC = () => (
  <ViewContainer>
    <TradeShares />
  </ViewContainer>
);

export default WithBaseUI(App, overrides);
