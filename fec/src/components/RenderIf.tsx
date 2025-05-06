import { memo } from "react";

type RenderIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

const RenderIf = ({ condition, children }: RenderIfProps) => (condition ? children : null);

export default memo(RenderIf);
