import React, {
  useCallback,
} from "react";
import {
  Link,
  LinkProps,
  useHistory,
} from "react-router-dom";
import {
  Anchor as DefaultAnchor,
  AnchorProps as DefaultAnchorProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

type Props = LinkProps & DefaultAnchorProps & {
  to: string;
};

export type AnchorProps = Props;

const Anchor: React.FC<Props> = (
  {
    children,
    to,
    ...props
  },
) =>
{
  const history = useHistory();
  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement>,
    ) =>
    {
      event.preventDefault();
      history.push(
        to,
      );
    },
    [
      history,
      to,
    ],
  );

  return (
    <Link
      css=""
      component={DefaultAnchor}
      to={to}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Anchor;
