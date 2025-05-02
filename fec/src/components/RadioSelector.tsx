import { memo } from "react";

type RadioSelectorProps = {
  groupName: string;
  options: string[];
  className?: string;
  onChange?: (selected: string, selectedIndex: number) => void;
  selectedIndex?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

const RadioSelector = (props: RadioSelectorProps) => (
  <div className={`inline-flex flex-wrap gap-4 ${props.className ?? ""}`}>
    {props.options.map((option, index) => (
      <div key={option} className="flex items-center gap-1">
        <input
          className="peer accent-red-500 nth-[n+2]:ms-4"
          type="radio"
          id={props.groupName + index}
          name={props.groupName}
          required={props.required}
          checked={index === props.selectedIndex}
          onChange={() => props.onChange?.(option, index)}
          disabled={index !== props.selectedIndex ? props.disabled : false}
        />
        <label htmlFor={props.groupName + index}>{option}</label>
      </div>
    ))}

    <span className="ms-auto hidden text-red-500 peer-invalid:block">{props.error}</span>
  </div>
);
export default memo(RadioSelector);
