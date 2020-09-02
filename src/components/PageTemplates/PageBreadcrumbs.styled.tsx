import React from "react";
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

import {
  BreadcrumbProps,
} from "./PageBreadcrumbs";

export const GrommetTheme: React.FC = (
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

export const GrommetContainer: React.FC<JSXBoxProps> = (
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

const StoxbieAnchor: React.FC<AnchorProps> = (
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

const MediumText: React.FC<JSXTextProps> = (
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

export const StoxbieRootBreadcrumb: React.FC<BreadcrumbProps> = (
  props,
) =>
{
  const match = useRouteMatch(
    {
      path: "/",
      exact: true,
      strict: false,
      sensitive: false,
    },
  );

  if (match)
  {
    return null;
  }

  return (
    <StoxbieAnchor
      to="/"
      {...props}
    />
  );
};

export const StoxbieTickerBreadcrumb: React.FC<BreadcrumbProps> = (
  props,
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
      <MediumText {...props} />
    );
  }

  return (
    <StoxbieAnchor
      to={`/stock/${props.children}`}
      {...props}
    />
  );
};

export const StoxbieDateBreadcrumb: React.FC<BreadcrumbProps> = (
  props,
) =>
{
  const match = useRouteMatch(
    {
      path: "/trade/:ticker/:date",
      strict: true,
      sensitive: true,
    },
  );

  if (match)
  {
    return <MediumText {...props}/>;
  }

  return null;
};
