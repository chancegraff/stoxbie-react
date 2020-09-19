import React from "react";
import {
  Footer,
  Header,
  JSXBoxProps,
  Main,
} from "grommet";
import styled from "styled-components";

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Main
      fill={true}
      {...props}
    />
  );
};

const CoveringHeader = styled(
  Header,
)`
position: relative;
z-index: 2;
`;

export const GrommetHeader: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <CoveringHeader
      border={
        {
          color: "brand",
          side: "top",
          size: "16px",
          style: "solid",
        }
      }
      background="background-front"
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

export const GrommetMain: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Main
      height="auto !important"
      overflow="visible"
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

export const GrommetFooter: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Footer
      background="background-front"
      pad={
        {
          horizontal: "xlarge",
        }
      }
      {...props}
    />
  );
};
