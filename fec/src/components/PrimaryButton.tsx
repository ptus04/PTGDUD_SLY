import { memo } from "react";

type PrimaryButtonProps = {
  type?: HTMLButtonElement["type"];
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const PrimaryButton = ({ type = "button", className, onClick, children }: PrimaryButtonProps) => (
  <button
    className={`flex cursor-pointer items-center gap-2 rounded-md bg-red-500 px-4 py-2 font-semibold text-white duration-200 hover:bg-red-400 focus:outline-offset-2 focus:outline-red-500 active:bg-red-600 ${className}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default memo(PrimaryButton);
