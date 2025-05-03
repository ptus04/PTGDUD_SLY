import { memo } from "react";

type ButtonProps = {
  className?: string;
  preset?: "primary" | "secondary" | "tertiary";
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const presets = {
  primary: "bg-red-500 text-white hover:bg-red-400 active:bg-red-600",
  secondary: "border-red-500 border text-red-500 hover:text-white hover:bg-red-400 active:bg-red-600",
  tertiary: "text-red-500 hover:text-red-400 active:text-red-600",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold duration-200 focus:outline-offset-2 focus:outline-red-500 ${props.className} ${presets[props.preset ?? "primary"]}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default memo(Button);
