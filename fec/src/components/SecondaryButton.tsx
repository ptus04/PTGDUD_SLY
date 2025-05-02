import { memo } from "react";

type SecondaryButtonProps = {
  type?: HTMLButtonElement["type"];
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const SecondaryButton = ({ type = "button", className, onClick, children }: SecondaryButtonProps) => (
  <button
    className={`flex cursor-pointer items-center gap-2 rounded-md border border-red-500 px-4 py-2 font-semibold text-red-500 duration-200 hover:bg-red-400 hover:text-white focus:outline-offset-2 focus:outline-red-500 active:bg-red-600 ${className}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default memo(SecondaryButton);
