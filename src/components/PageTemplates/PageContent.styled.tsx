import React from "react";
import {
  Footer,
  Header,
  JSXBoxProps,
  Main,
} from "grommet";

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

export const GrommetHeader: React.FC<JSXBoxProps> = (
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
      pad={
        {
          horizontal: "xlarge",
        }
      }
      {...props}
    />
  );
};
