import { memo, useCallback, useContext } from "react";
import AppContext, { AppActionTypes } from "../AppContext";
import RenderIf from "./RenderIf";

const GlobalError = ({ error, type }: { error: string; type?: "warning" | "error" }) => {
  const { dispatch } = useContext(AppContext);

  const clearError = useCallback(() => {
    dispatch({ type: AppActionTypes.CLEAR_ERROR });
  }, [dispatch]);

  return (
    <RenderIf condition={!!error}>
      <div
        className={`m-2 flex justify-between rounded-md border ${type === "error" ? "border-red-400 bg-red-100 text-red-600" : "border-yellow-400 bg-yellow-100 text-yellow-600"} px-4 py-2`}
        role="alert"
        aria-live="assertive"
      >
        <p className="flex items-center gap-2">
          <i className={`fa fa-exclamation-triangle`} aria-hidden="true" />
          <span>{error}</span>
        </p>

        <button
          className="cursor-pointer"
          type="button"
          title="Đóng thông báo"
          onClick={clearError}
          aria-label="Đóng thông báo lỗi"
        >
          <i className="fa fa-close" aria-hidden="true" />
        </button>
      </div>
    </RenderIf>
  );
};

export default memo(GlobalError);
