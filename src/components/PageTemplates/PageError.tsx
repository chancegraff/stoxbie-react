import React, {
  useMemo,
} from "react";
import {
  Redirect,
  RouteProps,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  DEFAULT_ERROR_MESSAGE,
} from "utils/Constants";
import {
  useScrollToTop,
} from "utils/hooks/useScrollToTop";
import PageContent from "components/PageTemplates/PageContent";

import {
  GrommetHeading,
} from "./PageError.styled";

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
      else if (!location ||
               !location.state)
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

  useScrollToTop();

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
    <PageContent css="">
      <GrommetHeading css="">
        {message}
      </GrommetHeading>
    </PageContent>
  );
};

export default Error;
