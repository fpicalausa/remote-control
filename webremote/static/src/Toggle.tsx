import * as React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Toggle.css";

export default function Toggle({
  children,
  className
}: InferProps<typeof Toggle.propTypes>) {
  return <div className={`Toggle ${className || ''}`}>{children}</div>;
}

Toggle.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

function Option({
  id,
  value,
  children,
  onChange,
  checked
}: InferProps<typeof Option.propTypes>) {
  return (
    <>
      <input
        type="radio"
        value={value}
        checked={checked || false}
        onChange={e => {
          if (e.target.checked) {
            onChange(value);
          }
        }}
        id={id}
        className="Toggle-Option-Radio"
      />
      <label htmlFor={id} className="Toggle-Option">
        {children}
      </label>
    </>
  );
}

Option.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool
};

Toggle.Button = Option;
