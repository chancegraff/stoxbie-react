import React from "react";
import {
  Box,
  Card,
  Grid,
  Heading,
  JSXBoxProps,
  JSXGridProps,
  JSXHeadingProps,
} from "grommet";
import styled from "styled-components";

export const GrommetGrid: React.FC<JSXGridProps> = (
  props,
) =>
{
  return (
    <Grid
      responsive={true}
      fill={true}
      columns={
        [
          "auto",
          "flex",
        ]
      }
      rows={
        [
          "auto",
        ]
      }
      areas={
        [
          [
            "form",
            "illustration",
          ],
        ]
      }
      {...props}
    />
  );
};

const IllustrationContainer = styled(
  Box,
)`
position: relative;
`;

export const GrommetIllustrationContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <IllustrationContainer
      gridArea="illustration"
      fill="vertical"
      background="background-contrast"
      {...props}
    />
  );
};

export const GrommetFormContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      align="center"
      justify="center"
      width="xlarge"
      gridArea="form"
      fill="vertical"
      elevation="large"
      pad="large"
      {...props}
    />
  );
};

export const GrommetCard: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Card
      width="xlarge"
      height="xlarge"
      pad="large"
      elevation="medium"
      {...props}
    />
  );
};

export const GrommetHeading: React.FC<JSXHeadingProps> = (
  props,
) =>
{
  return (
    <Heading
      level="1"
      size="xsmall"
      {...props}
    />
  );
};
