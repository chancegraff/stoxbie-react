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

import {
  ROUTE_ORDER,
} from "utils/Constants";
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
  const inexactMatch = useRouteMatch(
    {
      path: "/order",
      exact: false,
    },
  );
  const exactMatch = useRouteMatch(
    {
      path: `${ROUTE_ORDER}`,
      exact: true,
    },
  );

  if (
    inexactMatch &&
    !exactMatch
  )
  {
    return (
      <StoxbieAnchor
        to={`${ROUTE_ORDER}`}
        {...props}
      />
    );
  }

  return null;
};

export const StoxbieTickerBreadcrumb: React.FC<BreadcrumbProps> = (
  props,
) =>
{
  const inexactMatch = useRouteMatch(
    {
      path: `${ROUTE_ORDER}/:ticker`,
      exact: false,
    },
  );
  const exactMatch = useRouteMatch(
    {
      path: `${ROUTE_ORDER}/:ticker`,
      exact: true,
    },
  );

  if (exactMatch)
  {
    return (
      <MediumText {...props} />
    );
  }
  else if (inexactMatch)
  {
    return (
      <StoxbieAnchor
        to={`${ROUTE_ORDER}/${props.children}`}
        {...props}
      />
    );
  }

  return null;
};

export const StoxbieDateBreadcrumb: React.FC<BreadcrumbProps> = (
  props,
) =>
{
  const match = useRouteMatch(
    {
      path: `${ROUTE_ORDER}/:ticker/:date`,
      exact: false,
    },
  );

  if (match)
  {
    return <MediumText {...props}/>;
  }

  return null;
};
