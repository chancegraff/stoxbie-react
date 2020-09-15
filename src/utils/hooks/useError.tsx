import React from "react";

import PageError from "components/PageTemplates/PageError";

export const useError = (
  error: string | undefined,
) =>
{
  if (error)
  {
    return (
      <PageError>
        {error}
      </PageError>
    );
  }
};
