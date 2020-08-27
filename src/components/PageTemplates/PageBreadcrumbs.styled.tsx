import React, {
  PropsHasChildren,
} from "react";
import {
  useRouteMatch,
} from "react-router-dom";
import {
  Box,
  JSXBoxProps,
  Text,
  ThemeContext,
} from "grommet";

import Anchor from "components/Grommet/Anchor";

export const StyledTheme: React.FC = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          anchor: {
            color: "text",
            fontWeight: "semibold",
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

export const RootBreadcrumb: React.FC = () =>
{
  return (
    <Anchor to="/">
      Ticker Search
    </Anchor>
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
      <Text>
        {children}
      </Text>
    );
  }

  return (
    <Anchor to={`/stock/${children}`}>
      {children}
    </Anchor>
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
    <Text>
      {`Trading from ${children}`}
    </Text>
  );
};
