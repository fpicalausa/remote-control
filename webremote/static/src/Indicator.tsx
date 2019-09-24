import React from "react";
import "./Indicator.css";

const Indicator: React.FC<{
  label: string;
  value: any;
  unit: string;
}> = ({ label, value, unit }) => {
  return (
    <div className="Indicator">
      <span className="Label">{label}</span>
      <span className="Value">
        <span>{value}</span>
        <span className="Unit">{unit}</span>
      </span>
    </div>
  );
};

export default Indicator;
