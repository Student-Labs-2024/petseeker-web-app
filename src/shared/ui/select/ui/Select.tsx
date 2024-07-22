import React from "react";
import styles from "./select.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

// Типизация пропсов компонента Select
type SelectProps = {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string;
  name?: string;
  style?: React.CSSProperties;
  id?: string;
  register?: UseFormRegisterReturn;
  label?: string;
  options: string[];
};

// Компонент Select
export const Select: React.FC<SelectProps> = ({
  label,
  options,
  register,
  ...rest
}) => {
  return (
    <label className={styles.label}>
      {label}
      <select className={styles.default} {...register} {...rest}>
        {options.length &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </label>
  );
};
