import React from "react";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import {
  OverridesT, Skeleton, SkeletonPropsT,
} from "baseui/dist/skeleton";
import {
  Caption2, Display3,
} from "baseui/dist/typography";
import { Company } from "iex-cloud";

type Props = {
  company?: Company;
};

const overrides: OverridesT = { Row: { style: {
  ":first-of-type": {
    height: "33px",
    marginBottom: "12px",
    width: "320px",
  },
  ":last-of-type": {
    height: "10px",
    width: "30px",
  },
} } };

const DetailsSkeleton: React.FC<Partial<SkeletonPropsT>> = (props) => {
  return (
    <Block
      alignItems="flex-end"
      display="flex"
      height={props.height}
      paddingBottom="2px"
    >
      <Skeleton
        animation={true}
        overrides={overrides}
        rows={2}
      />
    </Block>
  );
};

const StockName: React.FC<Props> = (props) => {
  const [
    , theme,
  ] = useStyletron();

  if (!props.company) {
    return <DetailsSkeleton height={theme.sizing.scale2400} />;
  }

  return (
    <>
      <Display3>
        {props.company.companyName}
      </Display3>
      <Caption2>
        {props.company.symbol}
      </Caption2>
    </>
  );
};

export default StockName;
