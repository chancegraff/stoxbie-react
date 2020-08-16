import React from "react";
import {
  Box,
} from "grommet";
import {
  Company, Logo,
} from "iex-cloud";

import PageBreadcrumb from "templates/PageBreadcrumb";
import PageContent from "templates/PageContent";
import PageError from "templates/PageError";
import StockLogo from "components/StockLogo";
import StockName from "components/StockName";
import TradeStart from "components/TradeStart";

type Props = {
  logo?: Logo;
  company?: Company;
  error?: string;
  handleStart: (date: string) => void;
};

const StockView: React.FC<Props> = (
  props,
) =>
{
  if (props.error)
  {
    return (
      <PageError>
        {props.error}
      </PageError>
    );
  }

  return (
    <PageContent>
      <Box
        margin={
          {
            bottom: "24px",
          }
        }
        width="100%"
      >
        <PageBreadcrumb />
      </Box>
      <Box
        direction="row"
        align="end"
        width="100%"
      >
        <Box>
          <StockLogo logo={props.logo} />
        </Box>
        <Box
          margin={
            {
              left: "12px",
            }
          }
          height={
            {
              min: "68px",
            }
          }
        >
          <StockName company={props.company} />
        </Box>
        <Box
          margin={
            {
              left: "18px",
            }
          }
          height={
            {
              min: "52px",
            }
          }
        >
          <TradeStart handleStart={props.handleStart} />
        </Box>
      </Box>
    </PageContent>
  );
};

export default StockView;
