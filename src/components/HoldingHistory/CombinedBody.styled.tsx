import React from "react";
import {
  JSXTableBodyProps,
  JSXTableCellProps,
  TableBody,
  TableCell,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import {
  getRGBA,
} from "grommet/utils/colors";
import styled from "styled-components/macro";

const BorderlessBody: React.FC<JSXTableBodyProps> = styled(
  TableBody,
)`
color: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["text-weak"],
      props.theme,
    );
  }
};
border-top: ${
  (
    props,
  ) =>
  {
    return `1px solid ${normalizeColor(
      props.theme.global.colors.background,
      props.theme,
    )}`;
  }
};

& td:first-of-type {
  border-left: 0px;
}

& td:last-of-type {
  border-right: 0px;
}

& tr {
  &:nth-of-type(odd) td {
    background-color: ${
      (
        props,
      ) =>
      {
        return getRGBA(
          normalizeColor(
            props.theme.global.colors.brand,
            props.theme,
          ),
          0.1,
        );
      }
    };
  }

  &:hover td div,
  &:hover td div svg {
    color: ${
      (
        props,
      ) =>
      {
        return normalizeColor(
          props.theme.global.colors["text-strong"],
          props.theme,
        );
      }
    };
    stroke: ${
      (
        props,
      ) =>
      {
        return normalizeColor(
          props.theme.global.colors["text-strong"],
          props.theme,
        );
      }
    };
  }
}
`;

export const GrommetTableBody: React.FC<JSXTableBodyProps> = (
  props,
) =>
{
  return (
    <BorderlessBody
      {...props}
    />
  );
};

const WeakCell: React.FC<JSXTableCellProps> = styled(
  TableCell,
)`
color: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["text-weak"],
      props.theme,
    );
  }
};

& svg {
  stroke: ${
    (
      props,
    ) =>
    {
      return normalizeColor(
        props.theme.global.colors["text-weak"],
        props.theme,
      );
    }
  };
}
`;

export const GrommetTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <WeakCell
      fill={true}
      border={
        {
          size: "0",
        }
      }
      align="end"
      background={
        {
          color: "brand",
          opacity: 0.2,
        }
      }
      {...props}
    />
  );
};
