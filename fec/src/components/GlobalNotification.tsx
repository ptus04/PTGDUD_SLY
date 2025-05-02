import { memo, useCallback } from "react";
import useStore from "../store/useStore";
import RenderIf from "./RenderIf";

const GlobalNotification = () => {
  const { state, dispatch } = useStore();

  const unsetSuccess = useCallback(() => {
    dispatch({ type: "UNSET_SUCCESS" });
  }, [dispatch]);

  const unsetWarning = useCallback(() => {
    dispatch({ type: "UNSET_WARNING" });
  }, [dispatch]);

  const unsetError = useCallback(() => {
    dispatch({ type: "UNSET_ERROR" });
  }, [dispatch]);

  return (
    <>
      <RenderIf condition={!!state.error}>
        <div
          className={`m-2 flex justify-between rounded-md border border-red-400 bg-red-100 px-4 py-2 text-red-600`}
          role="alert"
          aria-live="assertive"
        >
          <p className="flex items-center gap-2">
            <i className={`fa fa-exclamation-triangle`} aria-hidden="true" />
            <span>{state.error}</span>
          </p>

          <button
            className="cursor-pointer"
            type="button"
            onClick={unsetError}
            title="Đóng thông báo"
            aria-label="Đóng thông báo lỗi"
          >
            <i className="fa fa-close" aria-hidden="true" />
          </button>
        </div>
      </RenderIf>

      <RenderIf condition={!!state.warning}>
        <div
          className={`m-2 flex justify-between rounded-md border border-yellow-400 bg-yellow-100 px-4 py-2 text-yellow-600`}
          role="alert"
          aria-live="assertive"
        >
          <p className="flex items-center gap-2">
            <i className={`fa fa-exclamation-triangle`} aria-hidden="true" />
            <span>{state.warning}</span>
          </p>

          <button
            className="cursor-pointer"
            type="button"
            title="Đóng thông báo"
            onClick={unsetWarning}
            aria-label="Đóng thông báo cảnh báo"
          >
            <i className="fa fa-close" aria-hidden="true" />
          </button>
        </div>
      </RenderIf>

      <RenderIf condition={!!state.success}>
        <div
          className={`m-2 flex justify-between rounded-md border border-green-400 bg-green-100 px-4 py-2 text-green-600`}
          role="alert"
          aria-live="assertive"
        >
          <p className="flex items-center gap-2">
            <i className={`fa fa-check-circle`} aria-hidden="true" />
            <span>{state.success}</span>
          </p>

          <button
            className="cursor-pointer"
            type="button"
            title="Đóng thông báo"
            onClick={unsetSuccess}
            aria-label="Đóng thông báo thành công"
          >
            <i className="fa fa-close" aria-hidden="true" />
          </button>
        </div>
      </RenderIf>
    </>
  );
};

export default memo(GlobalNotification);
