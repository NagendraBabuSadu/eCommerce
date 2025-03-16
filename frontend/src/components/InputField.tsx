import { TextField } from "@mui/material";
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className:string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  className
}) => {
  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};


export default InputField;