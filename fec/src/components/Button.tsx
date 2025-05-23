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
  primary: "bg-red-500 text-white not-disabled:hover:bg-red-400 not-disabled:active:bg-red-600",
  secondary:
    "border-red-500 border text-red-500 not-disabled:hover:text-white not-disabled:hover:bg-red-400 not-disabled:active:bg-red-600",
  tertiary: "text-red-500 not-disabled:hover:text-red-400 not-disabled:active:text-red-600",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold duration-200 not-disabled:focus:outline-offset-2 not-disabled:focus:outline-red-500 ${props.className} ${presets[props.preset ?? "primary"]} ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default memo(Button);
