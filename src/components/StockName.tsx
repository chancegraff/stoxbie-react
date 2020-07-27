import React from "react";
import { useStyletron } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Display3, Caption2 } from "baseui/dist/typography";
import { Avatar } from "baseui/dist/avatar";
import { Skeleton } from "baseui/dist/skeleton";
import { Logo, Company } from "iex-cloud";

type Props = {
  logo?: Logo;
  company?: Company;
};

const SafeAvatar: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  if (!props.logo) {
    return (
      <Skeleton
        animation={true}
        width={theme.sizing.scale2400}
        height={theme.sizing.scale2400}
        overrides={{
          Root: {
            style: {
              borderRadius: "50%",
            },
          },
        }}
      />
    );
  }
  return (
    <Avatar
      name="Company logo"
      src={props.logo.url}
      size={theme.sizing.scale2400}
    />
  );
};

const SafeDetails: React.FC<Props> = (props) => {
  if (!props.company) {
    return (
      <Skeleton
        animation={true}
        rows={2}
        overrides={{
          Row: {
            style: {
              height: "35px",
              width: "300px",
              marginBottom: "10px",
              ":last-of-type": {
                height: "10px",
                width: "20px",
                marginBottom: "2px",
              },
            },
          },
        }}
      />
    );
  }
  return (
    <>
      <Display3>{props.company.companyName}</Display3>
      <Caption2>{props.company.symbol}</Caption2>
    </>
  );
};

const StockName: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  return (
    <Block width="100%" display="flex" alignItems="end">
      <SafeAvatar {...props} />
      <Block margin={theme.sizing.scale400}>
        <SafeDetails {...props} />
      </Block>
    </Block>
  );
};

export default StockName;
