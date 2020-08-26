import React from "react";

import SubmitOrder, {
  SubmitOrderProps,
} from "components/HoldingControls/SubmitOrder";

export const StyledSubmitOrder: React.FC<SubmitOrderProps> = (
  props,
) =>
{
  return (
    <SubmitOrder
      secondary={true}
      size="small"
      fill="horizontal"
      plain={true}
      {...props}
    >
      Exit
    </SubmitOrder>
  );
};
