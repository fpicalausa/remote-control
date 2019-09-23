import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Indicator.css";

export default function Indicator({
  label,
  value,
  unit
}: InferProps<typeof Indicator.propTypes>) {
  return (
    <div className="Indicator">
      <span className="Label">{label}</span>
      <span className="Value">
        <span>{value}</span>
        <span className="Unit">{unit}</span>
      </span>
    </div>
  );
}

Indicator.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};
