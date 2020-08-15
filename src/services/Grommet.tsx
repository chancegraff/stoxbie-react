import React from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";

const Grommet: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider plain={true}>
      {props.children}
    </GrommetProvider>
  );
};

export default Grommet;
