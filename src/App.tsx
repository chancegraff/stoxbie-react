import React from "react";
import { Container } from "components/Base";
import ViewContainer from "templates/ViewContainer";
import TradeShares from "views/TradeShares";
import BaseUI from "services/BaseUI";
import styles from "./App.module.scss";

const AppContainer: React.FC = (props) => (
  <Container className={styles.App}>{props.children}</Container>
);

const overrides = {
  AppContainer,
};

const App: React.FC = () => (
  <BaseUI overrides={overrides}>
    <ViewContainer>
      <TradeShares />
    </ViewContainer>
  </BaseUI>
);

export default App;
