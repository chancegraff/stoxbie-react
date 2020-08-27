import React, {
  useMemo,
} from "react";
import {
  Redirect, RouteProps,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {
  Heading,
} from "grommet";

import {
  DEFAULT_ERROR_MESSAGE,
} from "utils/Constants";
import PageContent from "components/PageTemplates/PageContent";

type Props = RouteProps;

const Error: React.FC<Props> = (
  {
    children,
  },
) =>
{
  const location = useLocation<string>();
  const match = useRouteMatch(
    {
      path: "/oops",
    },
  );

  const message = useMemo(
    () =>
    {
      if (!match)
      {
        return;
      }
      else if (!location || !location.state)
      {
        return DEFAULT_ERROR_MESSAGE;
      }

      return location.state;
    },
    [
      match,
      location,
    ],
  );

  if (!match)
  {
    return (
      <Redirect
        to={
          {
            pathname: "/oops",
            state: children,
          }
        }
      />
    );
  }

  return (
    <PageContent>
      <Heading
        size="medium"
        level="1"
      >
        {message}
      </Heading>
    </PageContent>
  );
};

export default Error;
