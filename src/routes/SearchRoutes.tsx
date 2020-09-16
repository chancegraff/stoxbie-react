import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import SearchView from "views/SearchView";

type Props = RouteProps;

const SearchRoutes: React.FC<Props> = () =>
{
  return (
    <SearchView />
  );
};

export default SearchRoutes;
