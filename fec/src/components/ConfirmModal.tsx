import { memo } from "react";
import Button from "./Button";
import RenderIf from "./RenderIf";

interface LogoutConfirmModalProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onAccept: () => void;
}

const ConfirmModal = (props: LogoutConfirmModalProps) => {
  return (
    <RenderIf condition={props.open}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative flex max-w-md flex-col gap-4 rounded-md bg-white p-4 shadow-md">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 aspect-square w-6 cursor-pointer text-gray-400 duration-200 hover:bg-red-500 hover:text-white"
            type="button"
            onClick={props.onClose}
            aria-label="Đóng"
          >
            <i className="fa fa-close" />
          </button>

          {/* Title */}
          <h3 className="border-b border-b-gray-300 text-center text-xl font-bold">{props.title}</h3>

          {/* Content */}
          <p className="text-center">{props.content}</p>

          {/* Actions */}
          <div className="flex justify-between gap-2">
            <Button type="button" preset="secondary" onClick={props.onCancel}>
              Hủy
            </Button>
            <Button type="button" preset="primary" onClick={props.onAccept}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </RenderIf>
  );
};

export default memo(ConfirmModal);
