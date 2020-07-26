import React from "react";

const Container: React.FC<PropsWithClass> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Container;
