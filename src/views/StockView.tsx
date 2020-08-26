import React from "react";
import {
  Box,
} from "grommet";
import {
  Company, Logo,
} from "iex-cloud";

import PageContent from "components/PageTemplates/PageContent";
import PageError from "components/PageTemplates/PageError";
import CompanyLogo from "components/StockSearch/CompanyLogo";
import CompanyName from "components/StockSearch/CompanyName";
import ChooseDate from "components/TimeControls/ChooseDate";

type Props = {
  logo: Logo | undefined;
  company: Company | undefined;
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
        direction="row"
        align="end"
        width="100%"
      >
        <Box>
          <CompanyLogo logo={props.logo} />
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
          <CompanyName company={props.company} />
        </Box>
        <Box
          margin={
            {
              left: "18px",
            }
          }
          height={
            {
              min: "62px",
            }
          }
        >
          <ChooseDate handleStart={props.handleStart} />
        </Box>
      </Box>
    </PageContent>
  );
};

export default StockView;
