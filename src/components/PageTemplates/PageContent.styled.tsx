import React from "react";
import {
  Footer,
  Header,
  JSXBoxProps,
  Main,
} from "grommet";
import styled from "styled-components/macro";

const Container: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Main
      {...props}
    />
  );
};

export const StyledContainer = styled(
  Container,
)``;

export const StyledHeader: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Header
      background={
        {
          color: "brand",
          opacity: 0.1,
        }
      }
      justify="start"
      gap="large"
      pad={
        {
          horizontal: "xlarge",
          vertical: "medium",
        }
      }
      {...props}
    />
  );
};

export const StyledMain: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Main
      height="auto !important"
      overflow="visible"
      flex="grow"
      pad={
        {
          horizontal: "xlarge",
          vertical: "medium",
        }
      }
      {...props}
    />
  );
};

export const StyledFooter: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Footer
      pad={
        {
          horizontal: "xlarge",
        }
      }
      {...props}
    />
  );
};
