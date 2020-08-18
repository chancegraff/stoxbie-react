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
  AnchorProps,
} from "grommet";

const Anchor: React.FC<LinkProps & AnchorProps & {
  to: string;
}> = (
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
