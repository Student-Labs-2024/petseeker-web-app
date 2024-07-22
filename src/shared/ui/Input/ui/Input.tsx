import React from "react";
import styles from "./input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

// Типизация пропсов компонента Input
type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  id?: string;
  type?: string; 
  accept?: string;
  multiple?: boolean;
  register?: UseFormRegisterReturn;
  label?: string;
};

// Компонент Input
export const Input: React.FC<InputProps> = ({ label, register, ...rest }) => {
  return (
    <label className={styles.label}>
      {label}
      <input className={styles.default} {...register} {...rest} />
    </label>
  );
};
