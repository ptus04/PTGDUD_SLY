import { memo } from "react";
import RenderIf from "./RenderIf";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <RenderIf condition={isLoading}>
      <div className="flex h-96 items-center justify-center gap-2 text-2xl text-gray-500">
        <i className="fa fa-spinner fa-spin"></i>
        <span>Đang tải...</span>
      </div>
    </RenderIf>
  );
};

export default memo(Loading);
