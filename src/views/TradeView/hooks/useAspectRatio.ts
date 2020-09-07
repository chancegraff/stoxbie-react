import {
  RefObject,
} from "react";
import useResizeObserver from "use-resize-observer";

export type AspectRatioHook<P> = {
  chartRef: RefObject<P>;
  chartWidth: number;
  chartHeight: number;
}

/**
 * @description Sets up resize observer and returns its attributes for use
 * @returns {AspectRatioHook<P>} Named resize observer attributes
 */
export const useAspectRatio = <P extends HTMLElement>(): AspectRatioHook<P> =>
{
  const {
    ref: chartRef,
    width: chartWidth = 1,
    height: chartHeight = 1,
  } = useResizeObserver<P>();

  return {
    chartRef,
    chartWidth,
    chartHeight,
  };
};
