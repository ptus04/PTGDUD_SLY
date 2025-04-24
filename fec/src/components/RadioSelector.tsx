import { Fragment, memo } from "react";

type RadioSelectorProps = {
  groupName: string;
  options: string[];
  onChange: (selected: string, selectedIndex: number) => void;
  selectedIndex?: number;
  required?: boolean;
  error?: string;
};

const RadioSelector = (props: RadioSelectorProps) => (
  <div className="inline-flex flex-wrap gap-1">
    {props.options.map((option, index) => (
      <Fragment key={option}>
        <input
          className="peer accent-red-500 nth-[n+2]:ms-4"
          type="radio"
          id={props.groupName + index}
          name={props.groupName}
          required={props.required}
          defaultChecked={index === props.selectedIndex}
          onChange={() => props.onChange(option, index)}
        />
        <label htmlFor={props.groupName + index}>{option}</label>
      </Fragment>
    ))}

    <span className="ms-auto hidden text-red-500 peer-invalid:block">{props.error}</span>
  </div>
);
export default memo(RadioSelector);
