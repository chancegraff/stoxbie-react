import React, {
  PropsHasChildren,
} from "react";
import {
  useRouteMatch,
} from "react-router-dom";
import {
  Box,
  JSXBoxProps,
  JSXTextProps,
  Text,
  ThemeContext,
} from "grommet";

import Anchor, {
  AnchorProps,
} from "components/Grommet/Anchor";

export const StyledTheme: React.FC = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          anchor: {
            fontWeight: "700",
            textDecoration: "underline",
            hover: {
              textDecoration: "none",
            },
          },
        }
      }
      {...props}
    />
  );
};

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      direction="row"
      justify="between"
      {...props}
    />
  );
};

const StyledAnchor: React.FC<AnchorProps> = (
  props,
) =>
{
  return (
    <Anchor
      size="medium"
      color="text"
      margin={
        {
          right: "medium",
        }
      }
      {...props}
    />
  );
};

const StyledText: React.FC<JSXTextProps> = (
  props,
) =>
{
  return (
    <Text
      size="medium"
      weight={700}
      margin={
        {
          right: "medium",
        }
      }
      {...props}
    />
  );
};

export const RootBreadcrumb: React.FC = () =>
{
  return (
    <StyledAnchor to="/">
      Ticker Search
    </StyledAnchor>
  );
};

export const TickerBreadcrumb: React.FC<PropsHasChildren> = (
  {
    children,
  },
) =>
{
  const match = useRouteMatch(
    {
      path: "/stock/:ticker",
      strict: true,
      sensitive: true,
    },
  );

  if (match)
  {
    return (
      <StyledText>
        {children}
      </StyledText>
    );
  }

  return (
    <StyledAnchor to={`/stock/${children}`}>
      {children}
    </StyledAnchor>
  );
};

export const DateBreadcrumb: React.FC<PropsHasChildren> = (
  {
    children,
  },
) =>
{
  const match = useRouteMatch(
    {
      path: "/trade/:ticker/:date",
      strict: true,
      sensitive: true,
    },
  );

  if (!match)
  {
    return null;
  }

  return (
    <StyledText>
      {`Trading from ${children}`}
    </StyledText>
  );
};
