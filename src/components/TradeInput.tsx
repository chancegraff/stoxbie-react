import React from "react";
import { Slider } from "baseui/slider";

type Props = unknown;

const TradeInput: React.FC<Props> = () => {
  return (
    <div>
      <div>Trade Input</div>
      <button>Buy</button>
      <button>Sell</button>
    </div>
  );
};

export default TradeInput;
