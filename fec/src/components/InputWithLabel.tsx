import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, memo } from "react";

type InputWithLabelProps = {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  autoFocus?: boolean;
  required?: boolean;
  pattern?: string;
  error?: string;
};

const InputWithLabel = (props: InputWithLabelProps) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold" htmlFor={props.id}>
      {props.label}
    </label>
    <input
      className="peer w-full rounded-md border-1 border-gray-300 px-4 py-2 hover:border-red-500 focus:outline-red-500"
      id={props.id}
      name={props.id}
      type={props.type}
      value={props.value}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      required={props.required}
      pattern={props.pattern}
      onChange={props.onChange}
    />
    <span className="hidden text-red-500 peer-invalid:block">{props.error}</span>
  </div>
);

export default memo(InputWithLabel);
