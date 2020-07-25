import React from "react";
import cx from "classnames";
import { useStyletron } from "baseui";
import { Container } from "../components/Base";
import styles from "./ViewContainer.module.scss";

type Props = unknown;

const ViewContainer: React.FC<Props> = (props) => {
  const [css, theme] = useStyletron();
  return (
    <Container
      className={cx(
        styles.ViewContainer,
        css({
          background: theme.colors.backgroundPrimary,
          color: theme.colors.contentPrimary,
        })
      )}
    >
      {props.children}
    </Container>
  );
};

export default ViewContainer;
